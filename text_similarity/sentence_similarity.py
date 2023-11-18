from sentence_transformers import SentenceTransformer, util

sample_log_data = {

    1 : "systemd[1] Started OpenSSH Per-Connection Daemon (10.0.54.68:56568).",
    2 : "sshd[1708145] error: kex_exchange_identification: Connection closed by remote host",
    3 :  "Connection closed by 10.0.54.68 port 56568",
    4 : "systemd[1] sshd@613-10.102.37.173:22-10.0.54.68:56568.service: Deactivated successfully.",
    5 : "systemd[1]: Started OpenSSH Per-Connection Daemon (172.24.11.228:42578).",
    6 : "sshd[1708252] error: kex_exchange_identification: Connection closed by remote host.:",
    7 : "Connection closed by 172.24.11.228 port 42578",
    8 : "systemd[1] sshd@614-10.102.37.173:22-172.24.11.228:42578.service: Deactivated successfully.",
}

sample_log_data2 = {
    1: "start_cmxmarsserver.sh[209720]: Got Data: 884300 count: 34 t: 3:00:20 PM",
    2: "rspias-daemon[1016]: PIAS: PIAS: Remote access from client 10.0.2.217",
    3: "systemd[1]: Starting Script that periodically evaluates the main S.M.A.R.T metrics and prepares them for node_exporter...",
    4: "systemd[1]: mrt.smartmon-collector.service: Deactivated successfully.",
    5: "systemd[1]: Finished Script that periodically evaluates the main S.M.A.R.T metrics and prepares them for node_exporter.",
}


sentences = ["ssh connection logs", "metrics for script"]

model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

#Compute embedding for both lists
embedding_1= model.encode(list(sample_log_data.values()), convert_to_tensor=True)
embedding_2 = model.encode(sentences, convert_to_tensor=True)

similarity = util.pytorch_cos_sim(embedding_1, embedding_2)
print(similarity)