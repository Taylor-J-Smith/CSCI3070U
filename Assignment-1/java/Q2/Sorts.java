import java.util.Random;
import java.io.*;
import java.util.Arrays;

public class Sorts{
		//Reference:
		//http://www.java-tips.org/java-se-tips-100019/24-java-lang/1894-heap-sort-implementation-in-java.html
		public static void heapSort(String[] array)
		{
    		for(int i = array.length / 2; i >= 0; i-- )
				{
					swap(array, i, array.length);
				}
       	for(int i = array.length - 1; i > 0; i-- )
       	{
        	String temp = array[0];
					array[0] = array[i];
					array[i] = temp;

	        swap(array, 0, i);
       	}
		}

	   private static void swap(String[] array, int i, int n)
	   {
	       int child;
	       String temp;

	       for(temp = array[i]; (2*i+1) < n; i = child)
	       {
	           child = (2*i+1);
	           if(child != n - 1 && array[child].compareTo(array[child + 1]) <= 1)
						 {
							 child++;
						 }
						 if(temp.compareTo(array[child]) <= 0)
						 {
							 array[i] = array[child];
						 }
	           else{break;}
	       }
	       array[i] = temp;
	   }

	//Reference:
	//http://www.java-tips.org/java-se-tips-100019/24-java-lang/1895-merge-sort-implementation-in-java.html
	public static void mergeSort(String[] array)
	{
		String[] array2 = new String[array.length];
		mergeSort(array,array2,0,array.length-1);
	}

	private static void mergeSort(String[] array,String[] array2, int start, int end){

		//System.out.println("merge");

		if(start < end)
		{
			int mid = (int) Math.floor((start+end)/2);

			// System.out.println("Start: " + Integer.toString(start));
			// System.out.println("End: " + Integer.toString(end));
			// System.out.println("Mid: " + Integer.toString(mid));

			mergeSort(array, array2, start, mid);
    	mergeSort(array, array2, mid+1, end);

			merge(array, array2, start, mid+1, end);
		}
	}

	private static void merge(String[] array, String[] array2, int start, int mid, int end)
	{
		int lowerIndex = start;
		int upperIndex = mid;
		int counter = start;

		int lowerEnd = mid - 1;
		int upperEnd = end;

		int numElements = end - start + 1;

		while(lowerIndex <= lowerEnd && upperIndex <= upperEnd)
		{
          if(array[lowerIndex].compareTo(array[upperIndex]) <= 0)
					{
              array2[counter] = array[lowerIndex];
							lowerIndex++;
							counter++;
					}
          else
					{
              array2[counter] = array[upperIndex];
							upperIndex++;
							counter++;
       		}
		  }
			while(lowerIndex <= lowerEnd)
			{
					array2[counter] = array[lowerIndex];
					lowerIndex++;
					counter++;
			}
			while(upperIndex <= upperEnd)
			{
					array2[counter] = array[upperIndex];
					upperIndex++;
					counter++;
			}

					for(int i = 0; i < numElements; i++, upperEnd-- )
					          array[upperEnd] = array2[upperEnd];
	}

	//Reference: http://www.java2novice.com/java-sorting-algorithms/quick-sort/
	public static void quickSort(String[] array, int start, int end)
	{
		int i = start;
		int j = end;

		while(i <= j)
		{
			String pivot = array[start+(end-start)/2];

			while (array[i].compareTo(pivot) <= -1)
			{
        i++;
      }
      while (array[j].compareTo(pivot) >= 1)
			{
        j--;
			}
			if (i <= j)
			{
				String temp = array[i];
				array[i] = array[j];
				array[j] = temp;

      	i++;
        j--;
			}
			if (start < j)
            quickSort(array, start, j);
      if (i < end)
            quickSort(array, i, end);
		}
	}

	public static void diskSort(String filename, int splitNum, int stringsPerFile)
	{

		BufferedReader inputStream = null;
		BufferedWriter outputStream = null;

		String namesArray[] = new String[splitNum];

		try
				{
					inputStream = new BufferedReader(new FileReader(filename));
				}catch(IOException e){}

			for(int i = 0; i < splitNum; i++)
			{
//				if(outputStream == null)
//				{
					try
					{
						String newFilename =  "stringFiles/"+ Integer.toString(stringsPerFile) + " - " + Integer.toString(i);
						outputStream = new BufferedWriter(new FileWriter(newFilename));
						namesArray[i] = newFilename;
					}catch(IOException e){System.err.println();}
//				}
				String[] stringsArray = new String[stringsPerFile];

				for(int j = 0; j < stringsPerFile; j++)
				{
					String s = null;
					try
					{
						s = inputStream.readLine();
					}catch(IOException e){}

					stringsArray[j] = s;
				}

				Sorts.mergeSort(stringsArray);

				for(int k = 0; k < stringsPerFile; k++)
				{
					try
					{
						outputStream.write(stringsArray[k]);
						outputStream.newLine();
						outputStream.flush();
					}catch(IOException e){};
				}
			}

			System.out.println("Merging now");

			BufferedReader[] readerArray = new BufferedReader[splitNum];
			BufferedWriter sortedFile = null;
			try
			{
				sortedFile = new BufferedWriter(new FileWriter("testFolder/Sorted-Strings"));
			}catch(IOException e){System.out.println("Error opening sorted file");}

			String[] linesArray = new String[splitNum];

			for(int l = 0; l < splitNum; l++)
			{
				try
				{
					readerArray[l] = new BufferedReader(new FileReader(namesArray[l]));
					linesArray[l] = readerArray[l].readLine();
				}catch(IOException e){System.out.println("A");}
			}

			for(int m = 0; m < splitNum*stringsPerFile; m++)
			{
				int largest = -1;

				for(int z = 0; z < splitNum; z++)
				{
					if(linesArray[z] != null)
					{
						largest = z;
						break;
					}
				}
				for(int n = 0; n < splitNum; n++)
				{
					if(linesArray[n] != null)
					{
					//	System.out.println(n + " : " + linesArray[largest] + " ? " + linesArray[n] + " = " + linesArray[largest].compareTo(linesArray[n]));

						if(linesArray[largest].compareTo(linesArray[n]) >= 1)
						{
						//	System.out.println(n + " : " + linesArray[largest] + " ? " + linesArray[n] + " = " + linesArray[largest].compareTo(linesArray[n]));
							largest = n;
						}
					}
				}

				try
				{
					sortedFile.write(linesArray[largest]);
					sortedFile.newLine();
					sortedFile.flush();
					linesArray[largest] = readerArray[largest].readLine();
				}catch(IOException e){System.out.println("error?");}
			}
		}
}
