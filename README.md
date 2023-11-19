# LoGPT

<p align="center">
    <img src="assets/LoGPT.png" width="350"/>
</p>

> Checking your logs made easy!

LoGPT is a chatbot to communicate with your Logs. It filters out the most relevant lines from your log file and provides a summary based on the user-specified query. It provides both mobile and web applications for user interaction.


## Architectural Design
We use a serverless architecture that manages the incoming data stream of log files and communicates with DynamoDB and NLP model to compute log file similarity to return the closest log lines. Next, GPT-3 summarizes this log line ouput to provide a high level idea. This result is communicated with our web app and mobile application through the REST API.


<p align="center">
    <img src="assets/architecture.jpg" width="350"/>
</p>


## User Interface
Below, we provide screenshots demonstrating the login screen and the messaging components of our mobile application.

<p align="center">
    <img src="assets/message.jpg" width="200"/>
    <img src="assets/login.jpg" width="200"/>
</p>


