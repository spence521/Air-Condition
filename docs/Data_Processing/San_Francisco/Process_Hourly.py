from collections import defaultdict
import math
from statistics import mean
import csv
import glob
import os

def Get_Doc():
    for filename in glob.glob('*.csv'):
        with open(filename, "r", encoding="utf-8") as file1:
            file1 = file1.readlines()[1:]
        reader = list(csv.reader(file1))
        my_data = []
        my_data.append(["created_in", "entry_id", "PM1.0_CF_ATM_ug/m3", "PM2.5_CF_ATM_ug/m3", "PM10.0_CF_ATM_ug/m3", "UptimeMinutes", "RSSI_dbm", "Temperature_F",
                        "Humidity_%", "PM2.5_CF_1_ug/m3"])
        
        clusters = defaultdict(list)
        for entry in reader:
            created = str(entry[0])
            created_list = created.split(" ")
            date = created_list[0]
            time = created_list[1]
            time_list = time.split(":")
            
            hour = time_list[0]
            minute = time_list[1]
            second = time_list[2]

            temp = str(int(math.floor(float(minute) / 10.0)) * 10)
            clusters[date + " " + hour + ":00"].append(entry)

        for key, cluster in clusters.items():
            entry_id = []
            poll1 = []
            poll2 = []
            poll3 = []
            uptimes = []
            rssi = []
            Temperature_F = []
            Humidity = []
            poll4 = []

            for entry in cluster:
                entry_id.append(float(entry[1]))
                poll1.append(float(entry[2]))
                poll2.append(float(entry[3]))
                poll3.append(float(float(entry[4])))
                uptimes.append(float(entry[5]))
                rssi.append(float(entry[6]))
                Temperature_F.append(float(entry[7]))
                Humidity.append(float(entry[8]))
                poll4.append(float(entry[9]))

            entry_id_final = mean(entry_id)
            poll1_final = mean(poll1)
            poll2_final = mean(poll2)
            poll3_final = mean(poll3)
            uptime_final =  mean(uptimes)
            rssi_final = mean(rssi)
            Temperature_F_Final = mean(Temperature_F)
            Humidity_Final = mean(Humidity)
            poll4_final = mean(poll4)

            created = str(key)
            #print(key)
            created_list = created.split(" ")

            date = created_list[0]
            time = created_list[1]
            time_list = time.split(":")
            hour_start = int(time_list[0])
            hour_end = hour_start
            if hour_start == 23:
                hour_end = 0
            else:
                hour_end += 1
            #minute_start = int(time_list[1])
            #minute_end = minute_start
            #if minute_start + 10 >= 60:
            #    if hour_start == 23:
            #        hour_end = 0
            #    else:
            #        hour_end += 1
            #    minute_end = 0
            #else:
            #    minute_end += 10
            #if len(str(minute_start)) < 2:
            #    minute_start = "0" + str(minute_start)
            #if len(str(minute_end)) < 2:
            #    minute_end = "0" + str(minute_end)
            if len(str(hour_start)) < 2:
                hour_start = "0" + str(hour_start)
            if len(str(hour_end)) < 2:
                hour_end = "0" + str(hour_end)

            created_in1 = date + " " + str(hour_start) + ":00" + "-" + str(hour_end) + ":00"
            my_data.append([created_in1, entry_id_final, poll1_final, poll2_final, poll3_final, uptime_final,
                                rssi_final, Temperature_F_Final, Humidity_Final, poll4_final])
        

        my_csv = open("Averaged_" + filename, "w")
        with my_csv:
            writer = csv.writer(my_csv, lineterminator='\n')
            writer.writerows(my_data)

def Get_Averaged_Docs():
    my_data = []
    beginning = ["created_in", "entry_id", "PM1.0_CF_ATM_ug/m3", "PM2.5_CF_ATM_ug/m3", "PM10.0_CF_ATM_ug/m3",
                    "UptimeMinutes", "RSSI_dbm", "Temperature_F",
                    "Humidity_%", "PM2.5_CF_1_ug/m3"]
    entry_id = defaultdict(list)
    poll1 = defaultdict(list)
    poll2 = defaultdict(list)
    poll3 = defaultdict(list)
    uptimes = defaultdict(list)
    rssi = defaultdict(list)
    Temperature_F = defaultdict(list)
    Humidity = defaultdict(list)
    poll4 = defaultdict(list)
    for filename in glob.glob('Averaged_*.csv'):
        #print(filename)
        with open(filename, "r", encoding="utf-8") as file1:
            file1 = file1.readlines()[1:]
        reader = list(csv.reader(file1))

        for entry in reader:
            created = str(entry[0])
            entry_id[created].append(float(entry[1]))
            poll1[created].append(float(entry[2]))
            poll2[created].append(float(entry[3]))
            poll3[created].append(float(float(entry[4])))
            uptimes[created].append(float(entry[5]))
            rssi[created].append(float(entry[6]))
            Temperature_F[created].append(float(entry[7]))
            Humidity[created].append(float(entry[8]))
            poll4[created].append(float(entry[9]))

    rows = defaultdict(list)
    for key, cluster in entry_id.items():
        rows[key].append(mean(cluster))
    for key, cluster in poll1.items():
        rows[key].append(mean(cluster))
    for key, cluster in poll2.items():
        rows[key].append(mean(cluster))
    for key, cluster in poll3.items():
        rows[key].append(mean(cluster))
    for key, cluster in uptimes.items():
        rows[key].append(mean(cluster))
    for key, cluster in rssi.items():
        rows[key].append(mean(cluster))
    for key, cluster in Temperature_F.items():
        rows[key].append(mean(cluster))
    for key, cluster in Humidity.items():
        rows[key].append(mean(cluster))
    for key, cluster in poll4.items():
        rows[key].append(mean(cluster))

    for key, entry in rows.items():
        my_data.append([key, entry[0], entry[1], entry[2], entry[3], entry[4], entry[5], entry[6], entry[7], entry[8]])
    
    for entry in my_data:
        created = str(entry[0])
        created_list = created.split(" ")
        
        date = created_list[0]
        date_list = date.split("-")
        year = date_list[0]
        month = date_list[1]
        day = date_list[2]


        time = created_list[1]
        time_list = time.split("-")
        first_time = time_list[0]
        first_time_list = first_time.split(":")
        
        first_hour = first_time_list[0]
        first_minute = first_time_list[1]

        second_time = time_list[1]

        date_time_list = [int(year), int(month), int(day), int(first_hour), int(first_minute), second_time]

        entry[0] = date_time_list
    my_data = sorted(my_data, key = lambda x: ((x[0])[0], (x[0])[1], (x[0])[2], (x[0])[3], (x[0])[4]))

    for entry in my_data:
        created_list = entry[0]

        day = str(created_list[2])
        if len(day) < 2:
            day = "0" + day

        first_hour = str(created_list[3])
        if len(first_hour) < 2:
            first_hour = "0" + first_hour

        first_minute = str(created_list[4])
        if len(first_minute) < 2:
            first_minute = "0" + first_minute

        created = str(created_list[0]) + "-" + str(created_list[1]) + "-" + day + " " + first_hour + ":" + first_minute + "-" + created_list[5]
        entry[0] = created
    my_sorted_data = [beginning] + my_data

    directory = str(os.getcwd())
    directory_list = directory.split('\\')
    city_name = directory_list[len(directory_list)-1]

    my_csv = open("Averaged_" + city_name + ".csv", "w")
    with my_csv:
        writer = csv.writer(my_csv, lineterminator='\n')
        writer.writerows(my_sorted_data)

if __name__ == "__main__":
    Get_Doc()
    Get_Averaged_Docs()
    exit(0)