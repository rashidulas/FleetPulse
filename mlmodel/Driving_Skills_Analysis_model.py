import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.multioutput import MultiOutputRegressor
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score

# Load the driver data
data_path = 'Driver Metrics Sample.csv'
driver_data = pd.read_csv(data_path)

# Enhanced skill score calculation for higher values
def generate_skill_scores(row):
    scores = {
        'Acceleration': min(100, max(0, row['impact_score'] * 20 + 60)),  # Increased multiplier and base
        'Braking': min(100, max(0, row['perfect_trips'] * 12 + 40)),     # Increased multiplier and base
        'Cornering': min(100, max(0, row['impact_score'] * 20 + 60)),    # Increased multiplier and base
        'Speed Control': min(100, max(0, row['incident_free_days'] * 4 + 50)), # Increased multiplier and base
        'Following Distance': min(100, max(0, row['perfect_trips'] * 12 + 40)), # Increased multiplier and base
        'Eco-Driving': min(100, max(0, (row['fuel_saved'] + row['co2_reduced']) * 7 + 50)) # Increased base
    }
    return pd.Series(scores)

# Apply the simulated skill score generation
driver_data[['Acceleration', 'Braking', 'Cornering', 'Speed Control', 'Following Distance', 'Eco-Driving']] = driver_data.apply(generate_skill_scores, axis=1)

# Aggregating results by driver name to get average skill scores for each driver
average_scores = driver_data.groupby('driver_name')[['Acceleration', 'Braking', 'Cornering', 'Speed Control', 'Following Distance', 'Eco-Driving']].mean()

# Select features for training (based on example metrics)
features = ['impact_score', 'fuel_saved', 'co2_reduced', 'idle_time', 'perfect_trips', 'incident_free_days']
X = driver_data[features]
y = driver_data[['Acceleration', 'Braking', 'Cornering', 'Speed Control', 'Following Distance', 'Eco-Driving']]

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Initialize and train a multi-output regressor
model = MultiOutputRegressor(RandomForestRegressor(random_state=42))
model.fit(X_train, y_train)

# Predict skill scores on the test set
y_pred = model.predict(X_test)

# Convert predictions and actual values to DataFrames for easier viewing
y_pred_df = pd.DataFrame(y_pred, columns=y.columns, index=X_test.index)
y_test_df = y_test.reset_index(drop=True)

# Evaluate the model performance
mae = mean_absolute_error(y_test, y_pred, multioutput='raw_values')
r2 = r2_score(y_test, y_pred, multioutput='variance_weighted')

# Display mean absolute error and R2 score
# print("Mean Absolute Error per skill:", dict(zip(y.columns, mae)))
# print("Overall R2 Score:", r2)

# Display average skill scores for each driver
# print("\nAverage Skill Scores by Driver Name:\n", average_scores)

# Display predictions for each driver in the test set, grouped by driver_name
results = driver_data[['driver_name']].iloc[X_test.index]
results = results.assign(**y_pred_df.round(1))

# Show results grouped by driver_name, with sample output for clarity
print("\nPredicted Skill Scores for Drivers in Test Set:\n", results.groupby('driver_name').mean().round(1))
