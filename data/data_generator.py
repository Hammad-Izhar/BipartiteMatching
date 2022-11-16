import numpy as np;

NUM_OF_PEOPLE = 300
NUM_OF_LABS = 30
MAX_PREFERENCES_PER_PERSON = 5

output = f"NAME,PREFERENCES\n"

for p_index in range(NUM_OF_PEOPLE):
    num_of_preferences = np.random.randint(1, MAX_PREFERENCES_PER_PERSON + 1)
    labs = np.random.randint(1, NUM_OF_LABS + 1, num_of_preferences)
    lab_preference = ';'.join(map(lambda x: f"L{x}", labs))
    output += f"P{p_index},{lab_preference}\n"

with open("data.csv", "w") as f:
    f.write(output)