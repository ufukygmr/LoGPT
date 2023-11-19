# LoGPT

<p align="center">
    <img src="assets/LoGPT.png" width="350"/>
</p>

> Chatbot to communicate with your Logs!


## Architectural Design
We use a serverless architecture that manages the incoming data stream of log files and communicates with DynamoDB and NLP model to compute log file similarity to return the closest log lines. Next, GPT-3 summarizes this log line ouput to provide a high level idea. This result is communicated with our web app and mobile application through the REST API.


<p align="center">
    <img src="assets/architecture.jpg" width="350"/>
</p>




