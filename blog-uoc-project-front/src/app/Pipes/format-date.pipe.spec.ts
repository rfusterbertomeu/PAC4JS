import { FormatDatePipe } from './format-date.pipe';

describe('FormatDatePipe', () => {
  let pipe: FormatDatePipe;
  
  beforeEach(() => {
    pipe = new FormatDatePipe();
  });
  
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('format date pipe type 1 success', () => {
    let date: Date = new Date('9/3/1996');
    let type: number = 1;
    const result = pipe.transform(date,type);
    expect(result).toBe('03091996'); 
  });
  
  it('format date pipe type 2 success', () => {
    let date: Date = new Date('9/3/1996');
    let type: number = 2;
    const result = pipe.transform(date,type);
    expect(result).toBe('03 / 09 / 1996'); 
  });
    
  it('format date pipe type 3 success', () => {
    let date: Date = new Date('9/3/1996');
    let type: number = 3;
    const result = pipe.transform(date,type);
    expect(result).toBe('03/09/1996'); 
  });

  it('format date pipe type 4 success', () => {
    let date: Date = new Date('9/3/1996');
    let type: number = 4;
    const result = pipe.transform(date,type);
    expect(result).toBe('1996-09-03'); 
  });
});
