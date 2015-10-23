import matplotlib.pyplot as plt

with open('times/heap-times.txt') as f:
    runtimes = [int(line.strip()) for line in f]
with open('times/merge-times.txt') as f:
    runtimes2 = [int(line.strip()) for line in f]
with open('times/quick-times.txt') as f:
    runtimes3 = [int(line.strip()) for line in f]

plt.hist(runtimes)
plt.hist(runtimes2)
plt.hist(runtimes3)
plt.savefig('runtime.png')
plt.show()
