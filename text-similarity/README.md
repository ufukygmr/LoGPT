# Sentence-BERT based Log Similarity

We use a Sentence-BERT model based on the [Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks](https://arxiv.org/abs/1908.10084) paper to compute the semantic textual similarity between the user provided query and the log files.

We address the problem as follows:

## 1. Log file / stream parsing
We parse the provided log file in the desire format by extracting relevant information to our use case such as the timestamps, log headers (i.e. keywords), log description and line numbers.

## 2. Clustering
We cluster the log lines based on their timestamp where each cluster contains log lines that are produced within the same second. We assume that 1 second is the suitable length of time to group together the logs that are produced for the same task. 

## 3. Semantic Similarity
Considering each log line as one sentence, we extract an embedding with dimension `D=384` from each sentence. We use the model `all-MiniLM-L6-v2` with Transformer backbone to produce embeddings.

For the sentences that fall into the same cluster, we combine these embeddings using mean aggregation. The resulting embedding (or feature vector) is a representitive of the respective cluster. Concatenating these yields an embedding of size `(C,D)` where `C` is the number of clusters in the log file and `D` is the feature dimension.  

For a given user query as natural language prompt, e.g. `"Python script error"`, we compute an embedding in a similar fashion. As we have both cluster embeddings and the query embedding in the same feature space, we can compute cosine similarity between these, to find the cluster of logs (or sentences) that is the most similar to the provided query. We return the log lines belonging to the cluster based on top-1 similarity score.
