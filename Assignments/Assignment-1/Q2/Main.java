import java.util.Arrays;
import java.io.*;

public class Main{

	public static void main(String[] args){

		Generator g = new Generator("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz");
		String[] arrayH = new String[1000000];
		String[] arrayM = new String[1000000];
		String[] arrayQ = new String[1000000];

		arrayH = g.generate(1000000,100);
		arrayM = arrayH;
		arrayQ = arrayM;

		long hStartTime = System.currentTimeMillis();
		Sorts.heapSort(arrayH);
		long hEndTime = System.currentTimeMillis();

		long mStartTime = System.currentTimeMillis();
		Sorts.mergeSort(arrayM);
		long mEndTime = System.currentTimeMillis();

		long qStartTime = System.currentTimeMillis();
		Sorts.quickSort(arrayQ, 0, arrayQ.length-1);
		long qEndTime = System.currentTimeMillis();

		PrintWriter h = null;
		PrintWriter q = null;
		PrintWriter m = null;

		try
		{
			h = new PrintWriter(new BufferedWriter(new FileWriter("times/heap-times.txt",true)));
			m = new PrintWriter(new BufferedWriter(new FileWriter("times/merge-times.txt",true)));
			q = new PrintWriter(new BufferedWriter(new FileWriter("times/quick-times.txt",true)));
		}catch(IOException e){}

			h.println((hEndTime - hStartTime));
			m.println((mEndTime - mStartTime));
			q.println((qEndTime - qStartTime));

			h.close();
			m.close();
			q.close();
	}
}
