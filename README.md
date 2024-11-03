## FleetPulse 🌍
FleetPulse is an AI-powered web application designed to promote sustainable transportation and help combat climate change. By analyzing real-time data and offering eco-friendly driving recommendations, FleetPulse empowers both individual drivers and businesses to reduce fuel consumption and environmental impact.

## 🚀 Project Inspiration
Transportation accounts for a significant portion of global greenhouse gas emissions, which contribute to climate change. FleetPulse is inspired by the urgent need to reduce emissions by promoting eco-friendly driving behaviors, optimizing routes, and ensuring timely vehicle maintenance. FleetPulse provides a holistic approach to sustainable transportation, focusing on multiple factors impacting environmental impact and safety.

## 🛠️ Tech Stack
Frontend: Next.js
Authentication: Clerk
Backend: Databricks (for ML models)
ML Models: Random Forest for maintenance prediction, driver behavior analysis, and eco-driving suggestions
AI Suggestions: OpenAI API with GenAI for personalized driver recommendations
💻 Features
1. Vehicle Maintenance Prediction
Using machine learning (Random Forest model) in Databricks, FleetPulse provides insights into various maintenance levels for each vehicle, including:
Engine Maintenance
Battery Maintenance
Tire Maintenance
Oil Maintenance
Coolant Maintenance
Each maintenance level is scored on a range of 0-10, enabling proactive maintenance to reduce breakdowns and improve safety.
2. Performance Trends and Alerts
FleetPulse displays real-time performance trends and alerts for each vehicle based on backend data from Databricks. This feature helps fleet managers monitor vehicle health and address potential issues promptly.
3. Fuel-Efficient Route Suggestions
FleetPulse optimizes routes to minimize fuel consumption and carbon emissions by comparing previously used routes with new, more sustainable options. The dashboard shows predictive calculations of potential savings in emissions, helping drivers choose eco-friendly routes.
4. Driver Skills Analysis
By leveraging past data, another machine learning model in Databricks evaluates each driver’s skills in:
Acceleration
Braking
Cornering
Speed Control
Following Distance
Eco-Driving
The analysis highlights each driver’s strengths and areas for improvement to promote safer and more efficient driving habits.
5. Personalized AI Recommendations
FleetPulse uses OpenAI’s GenAI and carefully crafted prompts to generate actionable suggestions for each driver. Recommendations are based on real-time and historical data, helping drivers improve their eco-driving and safety practices.
6. Additional Insights
Weekly Performance
Today’s Events
Training Status
Safety Record
Recent Achievements
🔧 Project Setup
Clone the Repository

## 📈 ML Models and Data Flow
Vehicle Maintenance Model: Uses a Random Forest algorithm to analyze vehicle data and predict maintenance needs across key areas, scoring each from 0 to 10.
Driver Skills Model: Analyzes past driving data to generate a Driving Skills Analysis for each driver, focusing on metrics that impact both safety and environmental sustainability.
Route Optimization: Compares previous routes to determine fuel-efficient alternatives, helping drivers and businesses reduce emissions.
## 👤 Pages and Components
1. Dashboard
Overview of fleet status, environmental impact, financial metrics, and vehicle health.
2. Driver Page
Displays driver-specific insights such as:
Driving Skills Analysis
Weekly Performance
Today’s Events
Safety Record
Recent Achievements
Additional recommendations powered by OpenAI API for eco-friendly driving.
3. Fleet Management
Contains comprehensive data for each vehicle in the fleet, including maintenance predictions, performance trends, and fuel-efficient routes.
## 🤖 AI and GenAI Integration
The GenAI capabilities in FleetPulse enhance driver recommendations by analyzing data to provide personalized suggestions. These insights empower drivers to improve eco-driving practices and reduce their carbon footprint.


## Let's make transportation more sustainable, one mile at a time. 🌍
