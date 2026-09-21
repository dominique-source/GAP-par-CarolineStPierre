import { describe, expect, it } from "vitest";
import { gapDataProvider } from "./gap-data-provider";

describe("gapDataProvider", () => {
  it("charge les 19 médecins du GMF", () => {
    expect(gapDataProvider.getDoctors()).toHaveLength(19);
  });

  it("trouve Yves Bolduc par slug avec ses valeurs T17", () => {
    const yves = gapDataProvider.getDoctorBySlug("yves-bolduc");
    expect(yves).toBeDefined();
    expect(yves?.objectifTrimestre).toBe(1000);
    expect(yves?.plagesPubliees).toBe(1001);
    expect(yves?.visitesAdmissibles).toBe(937);
    expect(yves?.visitesRestantes).toBe(63);
    expect(yves?.objectifAnnuel).toBe(5000);
    expect(yves?.volumeAnnuelFinal).toBe(5005);
    expect(yves?.progressionPlages).toBeCloseTo(100.1, 5);
    expect(yves?.progressionVisites).toBeCloseTo(93.7, 5);
    expect(yves?.categorie).toBe("a-suivre");
  });

  it("retourne undefined pour un slug inconnu", () => {
    expect(gapDataProvider.getDoctorBySlug("inconnu")).toBeUndefined();
  });

  it("répartit les médecins en 8 atteints, 8 proches et 3 à suivre", () => {
    const collectif = gapDataProvider.getCollectif();
    expect(collectif.atteints).toBe(8);
    expect(collectif.proches).toBe(8);
    expect(collectif.aSuivre).toBe(3);
    expect(collectif.atteints + collectif.proches + collectif.aSuivre).toBe(19);
  });

  it("totalise 7 096 plages publiées et 6 752 visites admissibles", () => {
    const collectif = gapDataProvider.getCollectif();
    expect(collectif.plagesPublieesTotal).toBe(7096);
    expect(collectif.visitesAdmissiblesTotal).toBe(6752);
  });

  it("calcule 100,7 % de plages et 95,8 % de visites sur la cible collective", () => {
    const collectif = gapDataProvider.getCollectif();
    expect(collectif.progressionPlages).toBeCloseTo(100.7, 1);
    expect(collectif.progressionVisites).toBeCloseTo(95.8, 1);
  });

  it("assigne un portrait temporaire distinct à chaque médecin", () => {
    const doctors = gapDataProvider.getDoctors();
    for (const doctor of doctors) {
      expect(doctor.portrait.temporaire).toBe(true);
      expect(doctor.portrait.src).toMatch(/^\/portraits\//);
    }
  });
});
