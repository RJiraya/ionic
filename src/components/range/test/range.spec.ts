import { Range } from '../range';
import { mockConfig, mockDomController, mockElementRef, mockHaptic, mockPlatform, mockRenderer } from '../../../util/mock-providers';
import { Form } from '../../../util/form';


describe('Range', () => {

  describe('valueToRatio', () => {
    it('step=1', () => {
      let range = createRange();
      range.max = 5000;
      range.min = 2490;
      range.step = 1;
      range.snaps = true;
      expect(range._valueToRatio(5000)).toEqual(1);
      expect(range._valueToRatio(5100)).toEqual(1);
      expect(range._valueToRatio(2490)).toEqual(0);
      expect(range._valueToRatio(2000)).toEqual(0);

      let middle = (range.max - range.min) / 2 + range.min;
      expect(range._valueToRatio(middle)).toEqual(0.5);
    });

    it('step>range', () => {
      let range = createRange();
      range.max = 5000;
      range.min = 2490;
      range.step = 5900;
      range.snaps = true;
      expect(range._valueToRatio(7000)).toEqual(1);
      expect(range._valueToRatio(5000)).toEqual(0);
      expect(range._valueToRatio(2490)).toEqual(0);
      expect(range._valueToRatio(2000)).toEqual(0);
    });
  });

  describe('ratioToValue', () => {

    it('step=1', () => {
      let range = createRange();
      range.max = 5000;
      range.min = 2490;
      range.step = 1;
      range.snaps = true;
      expect(range._ratioToValue(0)).toEqual(2490);
      expect(range._ratioToValue(1)).toEqual(5000);

      let middle = (range.max - range.min) / 2 + range.min;
      expect(range._ratioToValue(0.5)).toEqual(middle);
    });

    it('step>range', () => {
      let range = createRange();
      range.max = 5000;
      range.min = 2490;
      range.step = 1;
      expect(range._ratioToValue(0)).toEqual(2490);
      expect(range._ratioToValue(1)).toEqual(5000);

      let middle = (range.max - range.min) / 2 + range.min;
      expect(range._ratioToValue(0.5)).toEqual(middle);
    });

  });

});


function createRange(): Range {
  let form = new Form();
  return new Range(form, mockHaptic(), null, mockConfig(), mockPlatform(), mockElementRef(), mockRenderer(), mockDomController());
}
