import { MedicoPipe } from './medico.pipe';

describe('MedicoPipe', () => {
  it('create an instance', () => {
    const pipe = new MedicoPipe();
    expect(pipe).toBeTruthy();
  });
});
