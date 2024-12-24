import pymongo
import csv
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import ast
from datetime import datetime
from scipy import stats

MONGO_URI = "mongodb+srv://main:Youtube44@formsubmissionexp2.goagw.mongodb.net/?retryWrites=true&w=majority&appName=formSubmissionEXP2"
DATABASE_NAME = "test"
COLLECTION_NAME = "EXP2"
CSV_FILE_NAME = "data.csv"


def parse_timestamps(timestamp_str):
    timestamps = ast.literal_eval(timestamp_str)
    return [datetime.fromisoformat(ts.replace('Z', '')) for ts in timestamps]


def main():
    # Case types for each question
    CASE_TYPES = ['C', 'K', 'K', 'K', 'C', 'K', 'K', 'C', 'K', 'C', 'K', 'C', 'K', 'C', 'K', 'C', 'C', 'K', 'C', 'C']

    client = pymongo.MongoClient(MONGO_URI)
    database = client[DATABASE_NAME]
    collection = database[COLLECTION_NAME]

    try:
        documents = list(collection.find())
        if not documents:
            print("No data found in the collection.")
            return

        fieldnames = documents[0].keys()
        with open(CSV_FILE_NAME, mode='w', newline='', encoding='utf-8') as csvfile:
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(documents)

        print(f"Data successfully written to {CSV_FILE_NAME}")

    except Exception as e:
        print(f"An error occurred: {e}")

    finally:
        client.close()

    # Read the CSV file
    data = pd.read_csv(CSV_FILE_NAME)

    # Normalize columns
    data['visualImpairment'] = data['visualImpairment'].str.lower()
    data['gender'] = data['gender'].str.lower()
    data['videoG'] = data['videoG'].str.lower()

    # Safely convert 'answers' and 'time' to appropriate formats
    data['answers'] = data['answers'].apply(lambda x: ast.literal_eval(x) if pd.notnull(x) else [])
    data['timestamps'] = data['time'].apply(parse_timestamps)
    data['total_time'] = data['timestamps'].apply(lambda x: (x[-1] - x[0]).total_seconds())

    # Function to validate the 'answers' column: ensure each array has 20 elements
    def validate_answers(answers):
        return isinstance(answers, list) and len(answers) == 20

    # Filter the DataFrame to keep only rows with valid answers
    data = data[data['answers'].apply(validate_answers)].reset_index(drop=True)

    # Function to calculate case-specific accuracy
    def calculate_case_specific_accuracy(answers, case_types):
        case_accuracies = []
        for ans, case_type in zip(answers, case_types):
            case_accuracies.append(ans)
        return sum(case_accuracies) / len(case_accuracies) * 100

    # Function to calculate per-question time
    def calculate_per_question_times(timestamps):
        # Calculate time between consecutive timestamps
        question_times = [(timestamps[i + 1] - timestamps[i]).total_seconds() for i in range(len(timestamps) - 1)]
        return question_times

    # Calculate accuracy
    def calculate_accuracy(answers):
        return sum(answers) / len(answers) * 100

    data['accuracy'] = data['answers'].apply(calculate_accuracy)
    data['question_times'] = data['timestamps'].apply(calculate_per_question_times)

    # Create a list to store case-specific accuracies and times
    case_specific_data = []

    # For each row, calculate accuracy and time for camel and kebab cases
    for _, row in data.iterrows():
        camel_answers = [row['answers'][i] for i in range(len(CASE_TYPES)) if CASE_TYPES[i] == 'C']
        kebab_answers = [row['answers'][i] for i in range(len(CASE_TYPES)) if CASE_TYPES[i] == 'K']

        camel_times = [row['question_times'][i] for i in range(len(row['question_times'])) if CASE_TYPES[i] == 'C']
        kebab_times = [row['question_times'][i] for i in range(len(row['question_times'])) if CASE_TYPES[i] == 'K']

        case_specific_data.append({
            'Camel Case Accuracy': calculate_case_specific_accuracy(camel_answers,
                                                                    [ct for ct in CASE_TYPES if ct == 'C']),
            'Kebab Case Accuracy': calculate_case_specific_accuracy(kebab_answers,
                                                                    [ct for ct in CASE_TYPES if ct == 'K']),
            'Camel Case Times': camel_times,
            'Kebab Case Times': kebab_times
        })

    # Convert to DataFrame
    case_data_df = pd.DataFrame(case_specific_data)

    # Accuracy Violin Plot
    plt.figure(figsize=(10, 6))
    accuracy_data = pd.melt(case_data_df[['Camel Case Accuracy', 'Kebab Case Accuracy']],
                            var_name='Case Type', value_name='Accuracy')
    sns.violinplot(x='Case Type', y='Accuracy', data=accuracy_data,
                   inner="stick", color="lightblue", linewidth=1)
    plt.title("Accuracy Distribution: Camel Case vs Kebab Case")
    plt.xlabel("Case Type")
    plt.ylabel("Accuracy (%)")
    plt.tight_layout()
    plt.show()

    # Time Violin Plot
    plt.figure(figsize=(10, 6))
    camel_times = [time for times in case_data_df['Camel Case Times'] for time in times]
    kebab_times = [time for times in case_data_df['Kebab Case Times'] for time in times]
    time_data = pd.DataFrame({
        'Case Type': ['Camel Case'] * len(camel_times) + ['Kebab Case'] * len(kebab_times),
        'Time (seconds)': camel_times + kebab_times
    })
    sns.violinplot(x='Case Type', y='Time (seconds)', data=time_data,
                   inner="stick", color="lightgreen", linewidth=1)
    plt.title("Time Taken: Camel Case vs Kebab Case")
    plt.xlabel("Case Type")
    plt.ylabel("Time per Question (seconds)")
    plt.tight_layout()
    plt.show()

    # Perform t-tests
    # Accuracy T-test
    accuracy_t_stat, accuracy_p_value = stats.ttest_ind(
        case_data_df['Camel Case Accuracy'],
        case_data_df['Kebab Case Accuracy']
    )

    # Time T-test
    time_t_stat, time_p_value = stats.ttest_ind(camel_times, kebab_times)

    print("\nCase Type Accuracy Comparison:")
    print("Camel Case Accuracy Statistics:")
    print(case_data_df['Camel Case Accuracy'].describe())
    print("\nKebab Case Accuracy Statistics:")
    print(case_data_df['Kebab Case Accuracy'].describe())
    print(f"\nAccuracy t-statistic: {accuracy_t_stat}, p-value: {accuracy_p_value}")

    print("\nCase Type Time Comparison:")
    print("Camel Case Time Statistics:")
    print(pd.Series(camel_times).describe())
    print("\nKebab Case Time Statistics:")
    print(pd.Series(kebab_times).describe())
    print(f"\nTime t-statistic: {time_t_stat}, p-value: {time_p_value}")

    # Existing visualizations from the original script remain the same
    # (Visual Impairment, Video Games, Gender visualizations)

    # Keep all the original visualizations and statistical analyses
    # Violin Plot for Accuracy by Visual Impairment
    plt.figure(figsize=(10, 6))
    sns.violinplot(x="visualImpairment", y="accuracy", data=data, inner="stick", color="lightblue", linewidth=1)
    plt.title("Violin Plot: Accuracy Distribution by Visual Impairment")
    plt.xlabel("Visual Impairment")
    plt.ylabel("Accuracy (%)")
    plt.tight_layout()
    plt.show()

    # Box Plot for Accuracy by Visual Impairment
    plt.figure(figsize=(10, 6))
    sns.boxplot(x="visualImpairment", y="accuracy", data=data, showcaps=True,
                boxprops={"facecolor": "none", "edgecolor": "black"})
    plt.title("Box Plot: Accuracy Distribution by Visual Impairment")
    plt.xlabel("Visual Impairment")
    plt.ylabel("Accuracy (%)")
    plt.tight_layout()
    plt.show()

    # Violin Plot for Total Time by Visual Impairment
    plt.figure(figsize=(10, 6))
    sns.violinplot(x="visualImpairment", y="total_time", data=data, inner="stick")
    plt.title("Total Time Taken by Visual Impairment Status")
    plt.xlabel("Visual Impairment")
    plt.ylabel("Total Time (seconds)")
    plt.tight_layout()
    plt.show()

    # Scatter Plot of Accuracy vs Total Time by Visual Impairment
    plt.figure(figsize=(10, 6))
    sns.scatterplot(x="total_time", y="accuracy", hue="visualImpairment", data=data)
    plt.title("Accuracy vs Total Time by Visual Impairment")
    plt.xlabel("Total Time (seconds)")
    plt.ylabel("Accuracy (%)")
    plt.tight_layout()
    plt.show()

    # 2. New Visualizations for Video Games
    plt.figure(figsize=(10, 6))
    sns.violinplot(x="videoG", y="accuracy", data=data, inner="stick", color="lightgreen", linewidth=1)
    plt.title("Accuracy by Video Game Playing")
    plt.xlabel("Plays Video Games")
    plt.ylabel("Accuracy (%)")
    plt.tight_layout()
    plt.show()

    # 3. New Visualizations for Gender
    plt.figure(figsize=(10, 6))
    sns.violinplot(x="gender", y="accuracy", data=data, inner="stick", color="lightsalmon", linewidth=1)
    plt.title("Accuracy by Gender")
    plt.xlabel("Gender")
    plt.ylabel("Accuracy (%)")
    plt.tight_layout()
    plt.show()

    # 4. Box Plot for Video Games
    plt.figure(figsize=(10, 6))
    sns.boxplot(x="videoG", y="accuracy", data=data, showcaps=True,
                boxprops={"facecolor": "none", "edgecolor": "black"})
    plt.title("Accuracy Distribution by Video Games")
    plt.xlabel("Plays Video Games")
    plt.ylabel("Accuracy (%)")
    plt.tight_layout()
    plt.show()

    # 5. Box Plot for Gender
    plt.figure(figsize=(10, 6))
    sns.boxplot(x="gender", y="accuracy", data=data, showcaps=True,
                boxprops={"facecolor": "none", "edgecolor": "black"})
    plt.title("Accuracy Distribution by Gender")
    plt.xlabel("Gender")
    plt.ylabel("Accuracy (%)")
    plt.tight_layout()
    plt.show()

    # Statistical Analysis for Video Games
    video_game_groups = data.groupby('videoG')['accuracy']
    print("\nVideo Games Accuracy Statistics:")
    print(video_game_groups.describe())

    # T-test for Video Games
    video_game_yes = data[data['videoG'] == 'yes']['accuracy']
    video_game_no = data[data['videoG'] == 'no']['accuracy']
    vg_t_stat, vg_p_value = stats.ttest_ind(video_game_yes, video_game_no)
    print("\nVideo Games T-test:")
    print(f"t-statistic: {vg_t_stat}, p-value: {vg_p_value}")

    # Statistical Analysis for Gender
    gender_groups = data.groupby('gender')['accuracy']
    print("\nGender Accuracy Statistics:")
    print(gender_groups.describe())

    # ANOVA for Gender (if more than two groups)
    unique_genders = data['gender'].unique()
    if len(unique_genders) > 2:
        gender_groups_list = [data[data['gender'] == gender]['accuracy'] for gender in unique_genders]
        f_stat, f_p_value = stats.f_oneway(*gender_groups_list)
        print("\nGender ANOVA:")
        print(f"F-statistic: {f_stat}, p-value: {f_p_value}")
    else:
        # T-test for two genders
        gender_group1 = data[data['gender'] == unique_genders[0]]['accuracy']
        gender_group2 = data[data['gender'] == unique_genders[1]]['accuracy']
        gender_t_stat, gender_p_value = stats.ttest_ind(gender_group1, gender_group2)
        print("\nGender T-test:")
        print(f"t-statistic: {gender_t_stat}, p-value: {gender_p_value}")


if __name__ == "__main__":
    main()