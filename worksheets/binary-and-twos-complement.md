# Binary and two's complement

[Printable version](https://focused-edu.vercel.app/resources/a-level-computer-science-binary) · Original FocusED practice · 12 questions · 24 marks

## Method

In an unsigned eight-bit word, the place values are 128, 64, 32, 16, 8, 4, 2, 1. In eight-bit two's complement the first weight is −128 and the remaining weights stay the same. The signed range is −128 to +127. State the word length and interpretation before calculating. To negate a representable value, invert all bits and add one, keeping the stated width.

### Worked example 1: represent −26

Start with +26 in eight bits: 00011010, because 16 + 8 + 2 = 26. Invert every bit to get 11100101. Add 1 to get 11100110. Keep all eight positions.

Check using the signed weights: −128 + 64 + 32 + 4 + 2 = −26. The leftmost bit has weight −128; it is not a separate minus sign attached to a seven-bit magnitude.

### Worked example 2: calculate 18 − 31

Rewrite subtraction as 18 + (−31). Positive 18 is 00010010. Positive 31 is 00011111, so its two’s-complement negative is 11100001.

Add 00010010 + 11100001 = 11110011. Signed decoding gives −128 + 64 + 32 + 16 + 2 + 1 = −13. The result agrees with 18 − 31 and is inside the eight-bit signed range, so there is no signed overflow.

      00010010   +18
    + 11100001   −31
    ──────────
      11110011   −13

Signed overflow means the exact answer is outside the signed range. A carry out is a separate unsigned-arithmetic observation.

## Questions

### 1. Read an unsigned word (2 marks)

Convert unsigned binary 10110110 to denary. Show the place values you add.

<details>
<summary>Check the answer and working</summary>

**182**

The 1 bits select 128, 32, 16, 4 and 2. Their sum is 128 + 32 + 16 + 4 + 2 = 182. This question specifies unsigned interpretation.

- 1 mark: a correct place-value expansion using the set bits.
- 1 mark: the denary result 182.

</details>

### 2. Keep all eight positions (2 marks)

Represent denary 93 as eight-bit unsigned binary. Show a place-value decomposition or an equivalent conversion method.

<details>
<summary>Check the answer and working</summary>

**01011101**

93 = 64 + 16 + 8 + 4 + 1. Under the weights 128, 64, 32, 16, 8, 4, 2, 1 this gives 0, 1, 0, 1, 1, 1, 0, 1. The leading zero keeps the stated eight-bit width.

- 1 mark: a correct conversion method, such as 64 + 16 + 8 + 4 + 1.
- 1 mark: the complete eight-bit result 01011101.

</details>

### 3. Use hexadecimal groups (2 marks)

Convert hexadecimal A7 to eight-bit binary. Make the two four-bit groups clear.

<details>
<summary>Check the answer and working</summary>

**1010 0111**

Hexadecimal A represents ten, so its four-bit group is 1010. Hexadecimal 7 becomes 0111. Joining the groups gives 10100111; do not drop the zero at the start of the second group.

- 1 mark: A becomes the four-bit group 1010.
- 1 mark: 7 becomes 0111, giving 1010 0111 overall.

</details>

### 4. Interpret a negative value (2 marks)

Interpret 11101100 as an eight-bit two’s-complement integer. Show how you obtain the denary value.

<details>
<summary>Check the answer and working</summary>

**−20**

Use −128 + 64 + 32 + 8 + 4 = −20. Alternatively, invert 11101100 to obtain 00010011 and add 1 to obtain 00010100, whose magnitude is 20; the original word is negative.

- 1 mark: a valid signed-weight calculation or invert-and-add-one method.
- 1 mark: the signed denary result −20.

</details>

### 5. Encode a negative value (2 marks)

Represent −45 in eight-bit two’s complement. Show the negation steps from +45.

<details>
<summary>Check the answer and working</summary>

**11010011**

+45 is 00101101. Invert to obtain 11010010, then add 1 to obtain 11010011. Checking the signed weights gives −128 + 64 + 16 + 2 + 1 = −45.

- 1 mark: +45 = 00101101 and a valid inversion/add-one method.
- 1 mark: the final eight-bit word 11010011.

</details>

### 6. State the signed range (2 marks)

State the smallest and largest denary integers representable in eight-bit two’s complement.

<details>
<summary>Check the answer and working</summary>

**Smallest −128; largest +127**

The smallest word is 10000000, worth −128. The largest is 01111111, worth 64 + 32 + 16 + 8 + 4 + 2 + 1 = 127. The range is asymmetric because zero is included and each of the 256 patterns represents one value.

- 1 mark: the minimum is −128.
- 1 mark: the maximum is +127.

</details>

### 7. Subtract by adding a negative (2 marks)

Calculate 37 − 52 using eight-bit two’s complement. Give the stored result bits and their signed denary interpretation.

<details>
<summary>Check the answer and working</summary>

**11110001, representing −15**

+37 is 00100101. +52 is 00110100, so −52 is 11001100. Adding 00100101 + 11001100 gives 11110001. Decode −128 + 64 + 32 + 16 + 1 = −15. The exact result fits, so no signed overflow occurs.

- 1 mark: the eight-bit result 11110001 from signed subtraction.
- 1 mark: its signed denary interpretation −15.

</details>

### 8. Recognise positive signed overflow (2 marks)

An eight-bit two’s-complement processor adds +100 and +40. Give its stored eight-bit result and explain whether signed overflow occurs.

<details>
<summary>Check the answer and working</summary>

**10001100; signed overflow occurs**

01100100 + 00101000 = 10001100. The exact denary answer is 140, outside the maximum +127. The stored pattern decodes to −116: two positive operands have produced a negative signed result.

- 1 mark: the stored result 10001100.
- 1 mark: signed overflow, justified by 140 exceeding +127 or by two positive operands producing a negative stored result.

</details>

### 9. Recognise negative signed overflow (2 marks)

Add −60 and −75 in eight-bit two’s complement. Retain the low eight result bits, and explain whether signed overflow occurs.

<details>
<summary>Check the answer and working</summary>

**01111001; signed overflow occurs**

−60 is 11000100 and −75 is 10110101. Their full binary sum is 1 01111001; the stored eight bits are 01111001, which decode to +121. The exact result −135 is below −128, so signed overflow occurred. The carry out does not repair the stored signed value.

- 1 mark: the stored eight bits 01111001.
- 1 mark: signed overflow, justified by −135 being below −128 or by two negative operands producing a positive stored result.

</details>

### 10. Preserve the value in a wider word (2 marks)

Extend eight-bit two’s-complement 11101100 to sixteen bits without changing its value. Explain which bits you add on the left.

<details>
<summary>Check the answer and working</summary>

**11111111 11101100**

Repeat the original sign bit, which is 1, in the eight new leftmost positions. The sixteen-bit word is 1111111111101100 and still represents −20. Adding zeros on the left would instead make the signed sixteen-bit value +236.

- 1 mark: the sixteen-bit result 1111111111101100.
- 1 mark: repeat the sign bit 1 on the left to preserve the negative value.

</details>

### 11. Separate carry from signed overflow (2 marks)

Adding 11111111 and 00000001 produces a carry out and stored bits 00000000. Interpret the operands as eight-bit two’s complement: state the signed calculation and whether signed overflow occurred.

<details>
<summary>Check the answer and working</summary>

**−1 + 1 = 0; no signed overflow**

11111111 represents −1, not unsigned 255, under the stated signed interpretation. The calculation is −1 + 1 = 0, exactly represented by 00000000. The carry out would signal an out-of-range result for unsigned 255 + 1, but it does not by itself establish signed overflow.

- 1 mark: the signed calculation −1 + 1 = 0.
- 1 mark: no signed overflow because the exact signed answer 0 fits; a carry out alone is insufficient.

</details>

### 12. Explain the smallest-value exception (2 marks)

A student negates the eight-bit two’s-complement word 10000000 by inverting and adding 1, then claims the result represents +128. Give the resulting eight bits and explain the error.

<details>
<summary>Check the answer and working</summary>

**10000000 again; +128 cannot be represented in eight-bit two’s complement**

Inversion gives 01111111; adding 1 gives 10000000. The original value is −128, while its mathematical negative +128 lies outside the eight-bit signed range. The retained word still decodes as −128, so this fixed-width negation cannot represent the required positive result.

- 1 mark: invert-and-add-one retains 10000000.
- 1 mark: +128 exceeds the signed maximum +127, so the word cannot mean +128 in this format.

</details>

## Scope and source

[Cambridge 9618 syllabus, 2027–2029, version 2: section 1.1, page 14](https://www.cambridgeinternational.org/Images/721397-2027-2029-syllabus.pdf). This worksheet covers part of information representation, not the complete syllabus. Questions, explanations and the self-check scheme are original FocusED material. They are not official Cambridge questions or an official mark scheme.

Print for your own study or classroom practice with attribution. Contact: umrzoqprimqulov48@gmail.com.
