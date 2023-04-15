#include <iostream>
using namespace std;
int *decToBinary(int n)
{
    int binaryNum[32];
    int i = 0;
    while (n > 0)
    {
        binaryNum[i] = n % 2;
        n = n / 2;
        i++;
    }
    return binaryNum;
}

int hamming(int a, int b)
{
    int *aBin = decToBinary(a);
    int *bBin = decToBinary(b);
    int dist = 0;
    for (int i = 0; i < 32; i++)
    {
        if ((aBin & (1 << i)) ^ (bBin & (1 << i)))
        {
            dist++;
        }
    }
    return dist;
}

int main()
{
    int a, b;
    cin >> a >> b;
    cout << hamming(a, b);
    return 0;
}
