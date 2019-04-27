import { EditorDirective } from './editor.directive';

describe('EditorDirective', () => {
  it('should create an instance', () => {
    const directive = new EditorDirective("0");
    expect(directive).toBeTruthy();
  });
});
