import pandas as pd


class LogParser():
    def __init__(self, filename) -> None:
        self.filename = filename
        
        with open(filename) as f:
            lines = f.readlines()
        
        self.data = {'line_no':[], 'timestamp':[], 'log_tag':[], 'log_details':[]}

        for line_id, line in enumerate(lines):
            time_index = 15
            tag_index  = time_index + line[time_index+1:].find(':')+1
            
            timestamp = line[:time_index]
            log_tag = line[time_index:tag_index]
            log_details = line[tag_index+2:]

            if ':' not in timestamp:
                timestamp = self.data['timestamp'][-1]
                log_tag = self.data['log_tag'][-1]
                log_details = line.split('   ')[-1]

            self.data['line_no'].append(line_id)
            self.data['timestamp'].append(timestamp)
            self.data['log_tag'].append(log_tag)
            self.data['log_details'].append(log_details)

        self.df = pd.DataFrame(data=self.data)

        # Add missing date to logs, convert timestamp
        self.df['timestamp'] = '2023 ' + self.df['timestamp']
        self.df['timestamp'] = pd.to_datetime(self.df['timestamp'], format="%Y %b %d %H:%M:%S")


    def calculate_embeddings(self):
        # Calculate vectors per 1 min interval in logs
        interval = self.df.groupby(pd.Grouper(key='timestamp', freq='1Min'))
        for interval_start, group in interval:
            # Interval operations
            print(f"Interval start: {interval_start}, Row count: {len(group)}")
        
        print(len(interval))



if __name__ == '__main__':
    parser = LogParser(filename="data/test_log1.out")
    parser.calculate_embeddings()


