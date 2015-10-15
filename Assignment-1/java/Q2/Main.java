public class Main{

	public static void main(String[] args){
	
		Generator g = new Generator("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz");
		long startTime = System.currentTimeMillis();
		String[] array = g.generate(1000000,100);
		long endTime = System.currentTimeMillis();

		//System.out.println("Start: " + startTime);
		//System.out.println("End: " + endTime);
		System.out.println("Duration: " + (endTime - startTime));
	}
}