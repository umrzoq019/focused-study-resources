import test from 'node:test';
import assert from 'node:assert/strict';
import { BINARY_WORKSHEET, BINARY_WORKED_EXAMPLES, BINARY_METHOD_DIAGRAM, BINARY_QUESTIONS, BINARY_LEARNING_RESOURCE } from './binary-worksheet.mjs';
import { parseLessonDiagram } from '../lib/lesson-diagrams.mjs';

// Use place-value sums as an independent check on the authored conversions.
const unsigned = bits => [...bits].reduce((sum,bit,index)=>sum+Number(bit)*2**(bits.length-index-1),0);
const signed = bits => [...bits].reduce((sum,bit,index)=>sum+Number(bit)*(index===0?-(2**(bits.length-1)):2**(bits.length-index-1)),0);
const encode = (value,width=8) => ((value+2**width)%2**width).toString(2).padStart(width,'0');
const flip = bits => [...bits].map(bit=>bit==='0'?'1':'0').join('');
const compact = text => text.replaceAll(' ','');
const normalMinus = text => text.replaceAll('−','-');

test('Twelve original questions provide exactly twenty-four explicit, non-overlapping marking points',()=>{
    assert.equal(BINARY_QUESTIONS.length,12);
    assert.equal(new Set(BINARY_QUESTIONS.map(row=>row.id)).size,12);
    assert.equal(BINARY_QUESTIONS.reduce((sum,row)=>sum+row.marks,0),24);
    assert.equal(BINARY_WORKSHEET.totalMarks,24);
    for(const question of BINARY_QUESTIONS){
        assert.equal(question.marks,2);assert.equal(question.scheme.length,2);
        assert.ok(question.scheme.every(point=>point.startsWith('1 mark:')));
        assert.equal(new Set(question.scheme).size,2);
        assert.ok(question.prompt.length>40 && question.answer && question.working.length>0);
    }
});

test('Authored unsigned, hexadecimal, signed and range answers agree with independent place values',()=>{
    for(const question of BINARY_QUESTIONS){
        const data=question.verification;
        if(data.kind==='unsigned-decode'){
            assert.equal(unsigned(data.bits),data.value);assert.equal(question.answer,String(data.value));
        }else if(data.kind==='unsigned-encode'){
            assert.equal(encode(data.value),data.bits);assert.equal(question.answer,data.bits);
        }else if(data.kind==='hex-encode'){
            assert.equal(Number.parseInt(data.hex,16),unsigned(data.bits));
            assert.equal(compact(question.answer),data.bits);
        }else if(data.kind==='signed-decode'){
            assert.equal(signed(data.bits),data.value);assert.equal(Number(normalMinus(question.answer)),data.value);
        }else if(data.kind==='signed-encode'){
            assert.equal(unsigned(data.positive),-data.value);
            assert.equal(flip(data.positive),data.inverted);
            assert.equal(unsigned(data.inverted)+1,unsigned(data.bits));
            assert.equal(signed(data.bits),data.value);assert.equal(question.answer,data.bits);
        }else if(data.kind==='range'){
            assert.equal(data.minimum,-(2**7));assert.equal(data.maximum,2**7-1);
            assert.equal(data.maximum-data.minimum+1,2**8);
            assert.ok(question.answer.includes('−128')&&question.answer.includes('+127'));
        }
    }
});

test('Every arithmetic answer distinguishes the stored word, exact value and signed-overflow condition',()=>{
    const questions=BINARY_QUESTIONS.filter(row=>row.verification.kind==='arithmetic');
    assert.equal(questions.length,4);
    for(const question of questions){
        const data=question.verification,exact=data.left+data.right;
        assert.equal(encode(exact),data.bits,question.id);
        assert.equal(signed(data.bits),data.value,question.id);
        assert.equal(exact< -128 || exact>127,data.overflow,question.id);
        const sameSign=(data.left<0)===(data.right<0);
        assert.equal(sameSign&&((data.left<0)!==(data.value<0)),data.overflow,question.id);
        assert.ok(question.working.join(' ').includes(data.bits),question.id+' must show the actual stored bits');
    }
    const carry=BINARY_QUESTIONS.find(row=>row.id==='carry-versus-overflow').verification;
    assert.ok(unsigned(encode(carry.left))+unsigned(encode(carry.right))>255);
    assert.equal(carry.value,0);assert.equal(carry.overflow,false);
    assert.equal(BINARY_QUESTIONS.find(row=>row.id==='positive-overflow').verification.value,-116);
    assert.equal(BINARY_QUESTIONS.find(row=>row.id==='negative-overflow').verification.value,121);
});

test('Sign extension preserves the negative value, while zero extension and minimum negation expose different results',()=>{
    const extended=BINARY_QUESTIONS.find(row=>row.id==='sign-extension');
    const data=extended.verification;
    assert.equal(data.bits.length,16);assert.equal(data.bits.slice(0,8),data.source[0].repeat(8));
    assert.equal(data.bits.slice(8),data.source);assert.equal(signed(data.bits),signed(data.source));
    assert.equal(signed(data.bits),data.value);assert.equal(compact(extended.answer),data.bits);
    assert.equal(signed('00000000'+data.source),236);
    const edge=BINARY_QUESTIONS.find(row=>row.id==='minimum-negation').verification;
    assert.equal(signed(edge.source),-128);assert.equal(flip(edge.source),edge.inverted);
    assert.equal(encode(unsigned(edge.inverted)+1),edge.bits);assert.equal(signed(edge.bits),edge.value);
    assert.equal(-signed(edge.source),edge.unrepresentable);assert.ok(edge.unrepresentable>127);
});

test('Both worked examples and the bounded teaching figures agree with their signed calculations',()=>{
    const first=BINARY_WORKED_EXAMPLES[0],second=BINARY_WORKED_EXAMPLES[1];
    assert.equal(first.verification.positive,26);assert.equal(flip(encode(26)),first.verification.inverted);
    assert.equal(encode(unsigned(first.verification.inverted)+1),first.verification.negative);
    assert.equal(signed(first.verification.negative),-26);
    assert.equal(second.verification.left+second.verification.right,second.verification.value);
    assert.equal(encode(second.verification.value),second.verification.bits);
    assert.equal(second.verification.value,-13);assert.equal(second.verification.overflow,false);
    assert.ok(parseLessonDiagram(JSON.stringify(first.diagram)));
    assert.ok(parseLessonDiagram(JSON.stringify(BINARY_METHOD_DIAGRAM)));
});

test('The public worksheet metadata describes free original practice and points to the existing stable course scope',()=>{
    assert.equal(BINARY_LEARNING_RESOURCE['@type'],'LearningResource');
    assert.equal(BINARY_LEARNING_RESOURCE.isAccessibleForFree,true);
    assert.equal(BINARY_LEARNING_RESOURCE.url,BINARY_WORKSHEET.url);
    assert.ok(!('aggregateRating' in BINARY_LEARNING_RESOURCE)&&!('review' in BINARY_LEARNING_RESOURCE));
    assert.equal(new URL(BINARY_WORKSHEET.source).hostname,'www.cambridgeinternational.org');
    const course=new URL(BINARY_WORKSHEET.courseHref,'https://focused-edu.vercel.app');
    assert.equal(course.pathname,'/exam-prep/a-level');
    assert.equal(course.searchParams.get('subject'),'focused-international-v1-subject-cambridge-9618-information-representation');
    assert.equal(course.searchParams.get('unit'),'focused-international-v1-unit-cambridge-9618-information-representation-data-representation');
});
