// Original FocusED practice. Publisher sources establish scope, not question text.
export const BINARY_WORKSHEET = Object.freeze({
    title: 'Binary and two’s complement: a free A-level Computer Science worksheet',
    description: 'Learn eight-bit two’s complement, then try 12 original questions with worked answers and a 24-mark self-check scheme. Free to read and print without an account.',
    path: '/resources/a-level-computer-science-binary',
    url: 'https://focused-edu.vercel.app/resources/a-level-computer-science-binary',
    courseHref: '/exam-prep/a-level?subject=focused-international-v1-subject-cambridge-9618-information-representation&unit=focused-international-v1-unit-cambridge-9618-information-representation-data-representation&view=study',
    source: 'https://www.cambridgeinternational.org/Images/721397-2027-2029-syllabus.pdf',
    sourceLabel: 'Cambridge 9618 syllabus, 2027–2029, version 2: section 1.1, page 14',
    email: 'umrzoqprimqulov48@gmail.com',
    totalMarks: 24,
    suggestedMinutes: 30,
});

export const BINARY_WORKED_EXAMPLES = [
    {
        title: 'Worked example 1: represent −26',
        paragraphs: [
            'Start with +26 in eight bits: 00011010, because 16 + 8 + 2 = 26. Invert every bit to get 11100101. Add 1 to get 11100110. Keep all eight positions.',
            'Check using the signed weights: −128 + 64 + 32 + 4 + 2 = −26. The leftmost bit has weight −128; it is not a separate minus sign attached to a seven-bit magnitude.',
        ],
        diagram: {type:'bits',title:'Negate a representable eight-bit value',groups:[{label:'+26 in eight bits',bits:'00011010'},{label:'Invert every bit',bits:'11100101'},{label:'Add 1: the representation of −26',bits:'11100110'}],caption:'To check a signed word, add the weights of its 1 bits using −128 for the leftmost position.'},
        verification: {positive:26,inverted:'11100101',negative:'11100110'},
    },
    {
        title: 'Worked example 2: calculate 18 − 31',
        paragraphs: [
            'Rewrite subtraction as 18 + (−31). Positive 18 is 00010010. Positive 31 is 00011111, so its two’s-complement negative is 11100001.',
            'Add 00010010 + 11100001 = 11110011. Signed decoding gives −128 + 64 + 32 + 16 + 2 + 1 = −13. The result agrees with 18 − 31 and is inside the eight-bit signed range, so there is no signed overflow.',
        ],
        calculation: '  00010010   +18\n+ 11100001   −31\n──────────\n  11110011   −13',
        verification: {left:18,right:-31,bits:'11110011',value:-13,overflow:false},
    },
];

export const BINARY_METHOD_DIAGRAM = {
    type:'flow',title:'A reliable signed-arithmetic routine',steps:[
        {label:'State the interpretation',detail:'Use eight-bit two’s complement and its range −128 to +127.'},
        {label:'Encode and calculate',detail:'Represent both operands, add their bit patterns and retain the eight result bits.'},
        {label:'Check independently',detail:'Decode the stored pattern and compare with the exact denary result; decide whether signed overflow occurred.'},
    ],caption:'A carry out is separate from signed overflow. The interpretation and available word length decide whether the exact answer can be represented.',
};

export const BINARY_QUESTIONS = [
    {
        id:'unsigned-value',title:'Read an unsigned word',marks:2,
        prompt:'Convert unsigned binary 10110110 to denary. Show the place values you add.',
        answer:'182',
        working:['The 1 bits select 128, 32, 16, 4 and 2. Their sum is 128 + 32 + 16 + 4 + 2 = 182. This question specifies unsigned interpretation.'],
        scheme:['1 mark: a correct place-value expansion using the set bits.','1 mark: the denary result 182.'],
        verification:{kind:'unsigned-decode',bits:'10110110',value:182},
    },
    {
        id:'unsigned-encode',title:'Keep all eight positions',marks:2,
        prompt:'Represent denary 93 as eight-bit unsigned binary. Show a place-value decomposition or an equivalent conversion method.',
        answer:'01011101',
        working:['93 = 64 + 16 + 8 + 4 + 1. Under the weights 128, 64, 32, 16, 8, 4, 2, 1 this gives 0, 1, 0, 1, 1, 1, 0, 1. The leading zero keeps the stated eight-bit width.'],
        scheme:['1 mark: a correct conversion method, such as 64 + 16 + 8 + 4 + 1.','1 mark: the complete eight-bit result 01011101.'],
        verification:{kind:'unsigned-encode',value:93,bits:'01011101'},
    },
    {
        id:'hex-groups',title:'Use hexadecimal groups',marks:2,
        prompt:'Convert hexadecimal A7 to eight-bit binary. Make the two four-bit groups clear.',
        answer:'1010 0111',
        working:['Hexadecimal A represents ten, so its four-bit group is 1010. Hexadecimal 7 becomes 0111. Joining the groups gives 10100111; do not drop the zero at the start of the second group.'],
        scheme:['1 mark: A becomes the four-bit group 1010.','1 mark: 7 becomes 0111, giving 1010 0111 overall.'],
        verification:{kind:'hex-encode',hex:'A7',bits:'10100111'},
    },
    {
        id:'signed-decode',title:'Interpret a negative value',marks:2,
        prompt:'Interpret 11101100 as an eight-bit two’s-complement integer. Show how you obtain the denary value.',
        answer:'−20',
        working:['Use −128 + 64 + 32 + 8 + 4 = −20. Alternatively, invert 11101100 to obtain 00010011 and add 1 to obtain 00010100, whose magnitude is 20; the original word is negative.'],
        scheme:['1 mark: a valid signed-weight calculation or invert-and-add-one method.','1 mark: the signed denary result −20.'],
        verification:{kind:'signed-decode',bits:'11101100',value:-20},
    },
    {
        id:'signed-encode',title:'Encode a negative value',marks:2,
        prompt:'Represent −45 in eight-bit two’s complement. Show the negation steps from +45.',
        answer:'11010011',
        working:['+45 is 00101101. Invert to obtain 11010010, then add 1 to obtain 11010011. Checking the signed weights gives −128 + 64 + 16 + 2 + 1 = −45.'],
        scheme:['1 mark: +45 = 00101101 and a valid inversion/add-one method.','1 mark: the final eight-bit word 11010011.'],
        verification:{kind:'signed-encode',value:-45,positive:'00101101',inverted:'11010010',bits:'11010011'},
    },
    {
        id:'signed-range',title:'State the signed range',marks:2,
        prompt:'State the smallest and largest denary integers representable in eight-bit two’s complement.',
        answer:'Smallest −128; largest +127',
        working:['The smallest word is 10000000, worth −128. The largest is 01111111, worth 64 + 32 + 16 + 8 + 4 + 2 + 1 = 127. The range is asymmetric because zero is included and each of the 256 patterns represents one value.'],
        scheme:['1 mark: the minimum is −128.','1 mark: the maximum is +127.'],
        verification:{kind:'range',minimum:-128,maximum:127},
    },
    {
        id:'subtraction',title:'Subtract by adding a negative',marks:2,
        prompt:'Calculate 37 − 52 using eight-bit two’s complement. Give the stored result bits and their signed denary interpretation.',
        answer:'11110001, representing −15',
        working:['+37 is 00100101. +52 is 00110100, so −52 is 11001100. Adding 00100101 + 11001100 gives 11110001. Decode −128 + 64 + 32 + 16 + 1 = −15. The exact result fits, so no signed overflow occurs.'],
        scheme:['1 mark: the eight-bit result 11110001 from signed subtraction.','1 mark: its signed denary interpretation −15.'],
        verification:{kind:'arithmetic',left:37,right:-52,bits:'11110001',value:-15,overflow:false},
    },
    {
        id:'positive-overflow',title:'Recognise positive signed overflow',marks:2,
        prompt:'An eight-bit two’s-complement processor adds +100 and +40. Give its stored eight-bit result and explain whether signed overflow occurs.',
        answer:'10001100; signed overflow occurs',
        working:['01100100 + 00101000 = 10001100. The exact denary answer is 140, outside the maximum +127. The stored pattern decodes to −116: two positive operands have produced a negative signed result.'],
        scheme:['1 mark: the stored result 10001100.','1 mark: signed overflow, justified by 140 exceeding +127 or by two positive operands producing a negative stored result.'],
        verification:{kind:'arithmetic',left:100,right:40,bits:'10001100',value:-116,overflow:true},
    },
    {
        id:'negative-overflow',title:'Recognise negative signed overflow',marks:2,
        prompt:'Add −60 and −75 in eight-bit two’s complement. Retain the low eight result bits, and explain whether signed overflow occurs.',
        answer:'01111001; signed overflow occurs',
        working:['−60 is 11000100 and −75 is 10110101. Their full binary sum is 1 01111001; the stored eight bits are 01111001, which decode to +121. The exact result −135 is below −128, so signed overflow occurred. The carry out does not repair the stored signed value.'],
        scheme:['1 mark: the stored eight bits 01111001.','1 mark: signed overflow, justified by −135 being below −128 or by two negative operands producing a positive stored result.'],
        verification:{kind:'arithmetic',left:-60,right:-75,bits:'01111001',value:121,overflow:true},
    },
    {
        id:'sign-extension',title:'Preserve the value in a wider word',marks:2,
        prompt:'Extend eight-bit two’s-complement 11101100 to sixteen bits without changing its value. Explain which bits you add on the left.',
        answer:'11111111 11101100',
        working:['Repeat the original sign bit, which is 1, in the eight new leftmost positions. The sixteen-bit word is 1111111111101100 and still represents −20. Adding zeros on the left would instead make the signed sixteen-bit value +236.'],
        scheme:['1 mark: the sixteen-bit result 1111111111101100.','1 mark: repeat the sign bit 1 on the left to preserve the negative value.'],
        verification:{kind:'sign-extension',source:'11101100',bits:'1111111111101100',value:-20},
    },
    {
        id:'carry-versus-overflow',title:'Separate carry from signed overflow',marks:2,
        prompt:'Adding 11111111 and 00000001 produces a carry out and stored bits 00000000. Interpret the operands as eight-bit two’s complement: state the signed calculation and whether signed overflow occurred.',
        answer:'−1 + 1 = 0; no signed overflow',
        working:['11111111 represents −1, not unsigned 255, under the stated signed interpretation. The calculation is −1 + 1 = 0, exactly represented by 00000000. The carry out would signal an out-of-range result for unsigned 255 + 1, but it does not by itself establish signed overflow.'],
        scheme:['1 mark: the signed calculation −1 + 1 = 0.','1 mark: no signed overflow because the exact signed answer 0 fits; a carry out alone is insufficient.'],
        verification:{kind:'arithmetic',left:-1,right:1,bits:'00000000',value:0,overflow:false},
    },
    {
        id:'minimum-negation',title:'Explain the smallest-value exception',marks:2,
        prompt:'A student negates the eight-bit two’s-complement word 10000000 by inverting and adding 1, then claims the result represents +128. Give the resulting eight bits and explain the error.',
        answer:'10000000 again; +128 cannot be represented in eight-bit two’s complement',
        working:['Inversion gives 01111111; adding 1 gives 10000000. The original value is −128, while its mathematical negative +128 lies outside the eight-bit signed range. The retained word still decodes as −128, so this fixed-width negation cannot represent the required positive result.'],
        scheme:['1 mark: invert-and-add-one retains 10000000.','1 mark: +128 exceeds the signed maximum +127, so the word cannot mean +128 in this format.'],
        verification:{kind:'minimum-negation',source:'10000000',inverted:'01111111',bits:'10000000',value:-128,unrepresentable:128},
    },
];

export const BINARY_LEARNING_RESOURCE = {
    '@context':'https://schema.org','@type':'LearningResource',
    name:BINARY_WORKSHEET.title,description:BINARY_WORKSHEET.description,
    url:BINARY_WORKSHEET.url,inLanguage:'en',isAccessibleForFree:true,
    learningResourceType:'Worksheet',educationalLevel:'AS / A Level',
    teaches:['Eight-bit two’s-complement representation','Binary integer arithmetic and signed overflow'],
    timeRequired:'PT30M',author:{'@type':'Organization',name:'FocusED',url:'https://focused-edu.vercel.app/'},
};
