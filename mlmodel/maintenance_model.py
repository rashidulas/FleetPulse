import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.multioutput import MultiOutputRegressor
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score

# Load your data
data_path = 'Fleet Metrics Sample Large.csv'
fleet_data = pd.read_csv(data_path)

# Define maintenance thresholds and maximum values for scaling
thresholds = {
    'engine_temperature': 100,
    'battery_voltage': 12,
    'tire_pressure': 32,
    'oil_level': 70,
    'coolant_level': 60
}
max_values = {
    'engine_temperature': 150,
    'battery_voltage': 10,
    'tire_pressure': 25,
    'oil_level': 50,
    'coolant_level': 40
}

# Generate synthetic labels for each sector (scaled 0-10 maintenance levels)
for feature, threshold in thresholds.items():
    if feature == 'engine_temperature':
        fleet_data[f'{feature}_maintenance'] = (
            (fleet_data[feature] - threshold) / (max_values[feature] - threshold) * 10
        ).clip(0, 10)
    else:
        fleet_data[f'{feature}_maintenance'] = (
            (threshold - fleet_data[feature]) / (threshold - max_values[feature]) * 10
        ).clip(0, 10)

# Prepare features and target variables for model training
features = ['engine_temperature', 'battery_voltage', 'tire_pressure', 'oil_level', 'coolant_level']
target_columns = [f'{feature}_maintenance' for feature in thresholds.keys()]
X = fleet_data[features]
y = fleet_data[target_columns]

# Split the data into training and testing sets
X_train, X_test, y_train, y_test, vehicle_ids_train, vehicle_ids_test = train_test_split(
    X, y, fleet_data['vehicle_id'], test_size=0.3, random_state=42)

# Initialize and train the multi-output regression model
model = MultiOutputRegressor(RandomForestRegressor(random_state=42))
model.fit(X_train, y_train)

# Predict maintenance levels on the test set
y_pred = model.predict(X_test)

# Round predictions and actual values to one decimal place
y_pred_rounded = pd.DataFrame(y_pred, columns=target_columns).round(1)
y_test_rounded = y_test.reset_index(drop=True).round(1)

# Evaluate the model performance
mae = mean_absolute_error(y_test, y_pred, multioutput='raw_values')
r2 = r2_score(y_test, y_pred, multioutput='variance_weighted')

# Display mean absolute error for each sector and overall R2 score
print("Mean Absolute Error per sector:", dict(zip(target_columns, mae)))
print("Overall R2 Score:", r2)

# Combine vehicle IDs with the rounded predictions and actual values for display
sample_results = pd.DataFrame({
    'Vehicle ID': vehicle_ids_test.reset_index(drop=True),
    # 'Actual': y_test_rounded.values.tolist(),
    'Predicted': y_pred_rounded.values.tolist()
}).head()

# Display sample results with Vehicle IDs
print("\nMaintenance Levels: [engine_maintenance, battery_maintenance, tire_maintenance, oil_maintenance, coolant_maintenance]\n", sample_results)
