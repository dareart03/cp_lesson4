import { MiniMaple } from "../src/miniMaple";

const mm = new MiniMaple();

test('Степень', () => {
    expect(mm.diff('4*x^3', 'x')).toBe('12*x^2');
});

test('Другая переменная', () => {
    expect(mm.diff('4*x^3', 'y')).toBe('0');
});

test('Разность', () => {
    expect(mm.diff('4*x^3 - x^2', 'x')).toBe('12*x^2 - 2*x');
});

test('Сумма', () => {
    expect(mm.diff('4*x^3 + x^2', 'x')).toBe('12*x^2 + 2*x');
});

test('Константа', () => {
    expect(mm.diff('5', 'x')).toBe('0');
});

test('Простая линейная форма', () => {
    expect(mm.diff('7*x', 'x')).toBe('7');
});

test('Проверка на пустой полином', () => {
    expect(mm.diff('', 'x')).toBe('0');
});

test('Дифференцирование полинома степени 1', () => {
    expect(mm.diff('y', 'y')).toBe('1');
});