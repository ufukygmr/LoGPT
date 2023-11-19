import os
import torch
import pandas as pd
from sentence_transformers import SentenceTransformer, util

pd.set_option('display.max_colwidth', None)


class LogParser():
    def __init__(self, log_path, embedding_load_path="") -> None:
        self.log_path = log_path
        self.embeddings =  None
        self.lines = None

        if embedding_load_path:
            # Load stored embedings
            self.embeddings = torch.load(embedding_load_path)

        with open(log_path) as f:
            self.lines = f.readlines()
        
        data = {'line_no':[], 'timestamp':[], 'log_tag':[], 'log_details':[]}

        for line_id, line in enumerate(self.lines):
            time_index = 15
            tag_index  = time_index + line[time_index+1:].find(':')+1
            
            timestamp = line[:time_index]
            log_tag = line[time_index:tag_index]
            log_details = line[tag_index+2:]

            if ':' not in timestamp:
                timestamp = data['timestamp'][-1]
                log_tag = data['log_tag'][-1]
                log_details = line.split('   ')[-1]

            data['line_no'].append(line_id)
            data['timestamp'].append(timestamp)
            data['log_tag'].append(log_tag)
            data['log_details'].append(log_details)

        self.df = pd.DataFrame(data=data)

        # Add missing date to logs, convert timestamp
        self.df['timestamp'] = '2023 ' + self.df['timestamp']
        self.df['timestamp'] = pd.to_datetime(self.df['timestamp'], format="%Y %b %d %H:%M:%S")

        # Calculate vectors per 1 sec interval in logs
        self.interval = self.df.groupby(pd.Grouper(key='timestamp', freq='1S'))

    def get_cluster_by_id(self, idx):
        keys = list(self.interval.groups.keys())
        line_ids = self.interval.get_group(keys[idx]).line_no.to_list()
        
        start_idx = line_ids[0]
        end_idx   = line_ids[-1]
        return self.lines[start_idx:end_idx+1]
    

    def calculate_embeddings(self):
        
        embeddings = []
        model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
        
        for interval_start, group in self.interval:
            # Interval operations
            print(f"Interval start: {interval_start}, Row count: {len(group)}")

            if len(group) == 0: 
                embeddings.append(torch.zeros((1,384)))
                continue

            sentences = [s.replace('\n','') for s in group['log_details'].to_list()]
            embedding_per_sentence = model.encode(sentences, convert_to_tensor=True)
            
            # Aggregate sentence features by mean
            cluster_embedding = torch.mean(embedding_per_sentence, dim=0)
            embeddings.append(cluster_embedding.unsqueeze(0))
        
        self.embeddings = torch.cat(embeddings, dim=0)

        os.makedirs("data", exist_ok=True)
        save_path = "data/{}_embeddings.pt".format(self.log_path.split('/')[-1].split('.')[-2])
        torch.save(self.embeddings, save_path)


if __name__ == '__main__':
    # Parse provided log file
    parser = LogParser(log_path="data/test_log1.out")
    # Calculate embeddings / vectors for each cluster
    parser.calculate_embeddings()

