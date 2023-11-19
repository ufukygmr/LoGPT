import sys
import warnings
warnings.filterwarnings('ignore')

from parse_logs import *
from sentence_transformers import SentenceTransformer, util

model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')


def compute_cosine_similarity(query, cluster_embeddings, K=1):
    query_embedding = model.encode(query, convert_to_tensor=True)
    similarity = util.pytorch_cos_sim(query_embedding, cluster_embeddings)
    values, indices = similarity[0].topk(K)
    return values, indices

def query_sample(query="Python script error"): 
    # Use case: Can return *.py files, jupyter notebook errors
    parser = LogParser(log_path="data/test_log1.out", embedding_load_path="data/test_log1_embeddings.pt")

    values, indices = compute_cosine_similarity(query, parser.embeddings)
    for i, idx in enumerate(indices):
        lines = parser.get_cluster_by_id(idx)
        print("".join(lines))
        print(values[i])
        print()
        print()


if __name__ == '__main__':

    log_file_path  = sys.argv[1]
    embedding_path = sys.argv[2]
    query          = sys.argv[3]

    parser = LogParser(log_path=log_file_path, embedding_load_path=embedding_path)
    values, indices = compute_cosine_similarity(query, parser.embeddings)
    for i, idx in enumerate(indices):
        lines = parser.get_cluster_by_id(idx)
        print("".join(lines))

    # parser = LogParser(log_path="data/test_log1.out", embedding_load_path="data/test_log1_embeddings.pt")
    # query_sample()
    