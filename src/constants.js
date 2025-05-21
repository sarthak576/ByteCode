export const LANGUAGE_VERSIONS = {
  javascript: "ES2023",
  python: "3.10",
  java: "17",
  typescript: "5.0",
  cpp: "C++20",
  kotlin: "1.8.20", 
};

export const CODE_SNIPPETS = {
  javascript: `// Basic JavaScript Example
function calculateSum(a, b) {
  return a + b;
}

console.log("Sum:", calculateSum(5, 3));`,
  
  python: `# Python Example with Type Hints
def calculate_sum(a: int, b: int) -> int:
    """Returns the sum of two numbers"""
    return a + b

if __name__ == "__main__":
    print("Sum:", calculate_sum(5, 3))`,
  
  java: `// Java Example with Simple Sum
public class Main {
    public static void main(String[] args) {
        int a = 5;
        int b = 3;
        int sum = a + b;
        System.out.println("Sum: " + sum);
    }
}`,
  
  typescript: `// TypeScript Example with Interface
interface Calculator {
  (a: number, b: number): number;
}

const sum: Calculator = (a, b) => a + b;

console.log("Sum:", sum(5, 3));`,
  

 
  
  cpp: `// C++ Example with Modern Syntax
#include <iostream>
using namespace std;

int calculate_sum(int a, int b) {
    return a + b;
}

int main() {
    cout << "Sum: " << calculate_sum(5, 3) << endl;
    return 0;
}`,
  
  kotlin: `// Kotlin Example with Null Safety
fun calculateSum(a: Int, b: Int): Int {
    return a + b
}

fun main() {
    println("Sum: " + calculateSum(5, 3))
}`,  
 

};