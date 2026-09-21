import { describe, expect, it } from "vitest";
import {
  categoriser,
  ecartVisites,
  progressionPlages,
  progressionVisites,
  visitesRestantes,
} from "./gap-calculations";

describe("progressionPlages", () => {
  it("calcule le pourcentage de plages publiées", () => {
    expect(progressionPlages(1001, 1000)).toBeCloseTo(100.1, 5);
  });

  it("protège contre une division par zéro", () => {
    expect(progressionPlages(50, 0)).toBe(0);
  });
});

describe("progressionVisites", () => {
  it("calcule le pourcentage de visites admissibles", () => {
    expect(progressionVisites(937, 1000)).toBeCloseTo(93.7, 5);
  });

  it("protège contre une division par zéro", () => {
    expect(progressionVisites(50, 0)).toBe(0);
  });
});

describe("visitesRestantes", () => {
  it("calcule le nombre de visites restantes", () => {
    expect(visitesRestantes(937, 1000)).toBe(63);
  });

  it("ne descend jamais sous zéro quand la cible est dépassée", () => {
    expect(visitesRestantes(1017, 1040)).toBe(23);
    expect(visitesRestantes(50, 43)).toBe(0);
  });
});

describe("ecartVisites", () => {
  it("est négatif sous la cible et positif au-dessus", () => {
    expect(ecartVisites(937, 1000)).toBe(-63);
    expect(ecartVisites(50, 43)).toBe(7);
  });
});

describe("categoriser", () => {
  it("classe atteint quand l'écart est >= 0", () => {
    expect(categoriser(0)).toBe("atteint");
    expect(categoriser(7)).toBe("atteint");
  });

  it("classe proche quand l'écart est entre -1 et -20", () => {
    expect(categoriser(-1)).toBe("proche");
    expect(categoriser(-20)).toBe("proche");
  });

  it("classe à suivre quand l'écart est <= -21", () => {
    expect(categoriser(-21)).toBe("a-suivre");
    expect(categoriser(-63)).toBe("a-suivre");
  });
});
