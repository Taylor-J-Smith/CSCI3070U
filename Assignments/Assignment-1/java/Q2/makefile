files = Main.java Sorts.java Generator.java
n ?= 100

run : prepare plot loop

prepare :
	javac $(files)

clean :
	rm *.class times/*-times.txt

plot: prepare loop
	python hist.py

loop: prepare
	n=$(n); \
	while [ $${n} -gt 0 ] ; do \
	echo $$n ; \
	n=`expr $$n - 1`; \
	java Main; \
	done;
