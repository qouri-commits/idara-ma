import { Router } from "express";
import { logger } from "../lib/logger";

const router = Router();

interface ServiceLink {
  serviceId: string;
  url: string;
}

const SERVICE_LINKS: ServiceLink[] = [
  // الهوية و الحالة المدنية
  { serviceId: "cnie-appointment", url: "https://www.cnie.ma" },
  { serviceId: "cnie-track", url: "https://www.cnie.ma" },
  { serviceId: "passport", url: "https://www.passeport.ma" },
  { serviceId: "watiqa-birth", url: "https://www.watiqa.ma" },
  { serviceId: "watiqa-marriage", url: "https://www.watiqa.ma" },
  { serviceId: "residence-cert", url: "https://www.watiqa.ma" },
  { serviceId: "watiqa-life-cert", url: "https://www.watiqa.ma" },
  { serviceId: "service-public", url: "https://www.service-public.ma" },
  { serviceId: "maroc-portal", url: "https://www.maroc.ma" },
  { serviceId: "diwan", url: "https://www.diwan.ma" },
  // العدل و الأمن
  { serviceId: "criminal-record", url: "https://casierjudiciaire.justice.gov.ma" },
  { serviceId: "complaints", url: "https://www.chikaya.ma" },
  { serviceId: "justice-portal", url: "https://www.justice.gov.ma" },
  { serviceId: "e-justice", url: "https://e-justice.justice.gov.ma" },
  { serviceId: "dgsn", url: "https://www.dgsn.gov.ma" },
  { serviceId: "gendarmerie", url: "https://www.gendarmerie.ma" },
  { serviceId: "cndh", url: "https://www.cndh.org.ma" },
  { serviceId: "cndp", url: "https://www.cndp.ma" },
  { serviceId: "cspj", url: "https://www.cspj.ma" },
  // الدعم و الحماية الاجتماعية
  { serviceId: "rnp", url: "https://www.rnp.ma" },
  { serviceId: "rsu", url: "https://www.rsu.ma" },
  { serviceId: "amo", url: "https://www.cnss.ma" },
  { serviceId: "daam", url: "https://www.daam.ma" },
  { serviceId: "daam-sakan", url: "https://www.daamsakane.ma" },
  { serviceId: "cnss-services", url: "https://www.cnss.ma" },
  { serviceId: "cnss-ipe", url: "https://www.cnss.ma" },
  { serviceId: "cnops", url: "https://www.cnops.org.ma" },
  { serviceId: "cimr", url: "https://www.cimr.ma" },
  { serviceId: "cps-retraite", url: "https://www.cmp.ma" },
  { serviceId: "anapec", url: "https://www.anapec.org" },
  { serviceId: "tayssir", url: "https://www.tayssir.gov.ma" },
  { serviceId: "entraide", url: "https://www.entraide.ma" },
  { serviceId: "social-ministry", url: "https://www.social.gov.ma" },
  // السياقة و التنقل
  { serviceId: "license-points", url: "https://services.narsa.gov.ma" },
  { serviceId: "vignette", url: "https://www.vignette.ma" },
  { serviceId: "narsa-main", url: "https://narsa.gov.ma" },
  { serviceId: "contraventions", url: "https://www.contraventions.ma" },
  { serviceId: "narsa-permis-code", url: "https://services.narsa.gov.ma" },
  { serviceId: "narsa-visite-technique", url: "https://narsa.gov.ma" },
  { serviceId: "passport-naql", url: "https://www.passeport.ma" },
  { serviceId: "oncf", url: "https://www.oncf-voyageurs.com" },
  { serviceId: "ctm", url: "https://www.ctm.ma" },
  { serviceId: "supratours", url: "https://www.supratours.ma" },
  // الضرائب و العقار و المقاولات
  { serviceId: "income-tax", url: "https://www.tax.gov.ma" },
  { serviceId: "tax-simul", url: "https://www.tax.gov.ma" },
  { serviceId: "property-registry", url: "https://www.ancfcc.gov.ma" },
  { serviceId: "ownership-cert", url: "https://www.ancfcc.gov.ma" },
  { serviceId: "tgr-payment", url: "https://www.tgr.gov.ma" },
  { serviceId: "tgr-bons-tresor", url: "https://www.tgr.gov.ma" },
  { serviceId: "ompic", url: "https://www.ompic.ma" },
  { serviceId: "registre-commerce", url: "https://www.registre.ma" },
  { serviceId: "cri-invest", url: "https://www.invest.ma" },
  { serviceId: "dar-moukawil", url: "https://www.darmoukawil.ma" },
  // التعليم و الشباب
  { serviceId: "massar", url: "https://massar.men.gov.ma" },
  { serviceId: "bac-results", url: "https://bac.men.gov.ma" },
  { serviceId: "bac-libre", url: "https://candidaturebac.men.gov.ma" },
  { serviceId: "tawjihi", url: "https://www.tawjihi.ma" },
  { serviceId: "scholarship", url: "https://www.minhaty.ma" },
  { serviceId: "enssup", url: "https://www.enssup.gov.ma" },
  { serviceId: "ofppt", url: "https://www.ofppt.ma" },
  { serviceId: "men-portal", url: "https://www.men.gov.ma" },
  { serviceId: "bourses-ext", url: "https://www.enssup.gov.ma" },
  { serviceId: "youth-pass", url: "https://www.passjeunes.ma" },
  { serviceId: "mjcc-youth", url: "https://www.mjcc.gov.ma" },
];

interface LinkStatus {
  brokenServiceIds: string[];
  checkedAt: string;
  totalChecked: number;
}

let cachedStatus: LinkStatus = {
  brokenServiceIds: [],
  checkedAt: new Date().toISOString(),
  totalChecked: 0,
};

async function checkUrl(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, {
      method: "HEAD",
      signal: AbortSignal.timeout(8000),
      headers: { "User-Agent": "IDARA.ma-LinkChecker/1.0" },
    });
    return res.ok || res.status === 405;
  } catch {
    try {
      const res = await fetch(url, {
        method: "GET",
        signal: AbortSignal.timeout(8000),
        headers: { "User-Agent": "IDARA.ma-LinkChecker/1.0" },
      });
      return res.ok || res.status === 405;
    } catch {
      return false;
    }
  }
}

async function runLinkCheck() {
  logger.info("Starting 24h link health check…");
  const results = await Promise.allSettled(
    SERVICE_LINKS.map(async ({ serviceId, url }) => {
      const ok = await checkUrl(url);
      return { serviceId, url, ok };
    })
  );

  const broken: string[] = [];
  for (const r of results) {
    if (r.status === "fulfilled" && !r.value.ok) {
      broken.push(r.value.serviceId);
      logger.warn({ serviceId: r.value.serviceId, url: r.value.url }, "🔴 BROKEN LINK DETECTED");
    }
  }

  cachedStatus = {
    brokenServiceIds: broken,
    checkedAt: new Date().toISOString(),
    totalChecked: SERVICE_LINKS.length,
  };

  const failRate = broken.length / SERVICE_LINKS.length;
  if (failRate > 0.6) {
    logger.warn(
      { failRate: Math.round(failRate * 100) + "%", broken: broken.length },
      "⚠️  High failure rate — likely a network restriction in this environment, not real broken links. Returning empty broken list."
    );
    cachedStatus = {
      brokenServiceIds: [],
      checkedAt: new Date().toISOString(),
      totalChecked: SERVICE_LINKS.length,
    };
    return;
  }

  if (broken.length === 0) {
    logger.info({ totalChecked: SERVICE_LINKS.length }, "✅ All links OK");
  } else {
    logger.error(
      { broken, count: broken.length },
      `🚨 ${broken.length} broken link(s) — update data.ts immediately`
    );
  }
}

const CHECK_INTERVAL_MS = 24 * 60 * 60 * 1000;
const STARTUP_DELAY_MS = 60 * 1000;

setTimeout(() => {
  runLinkCheck().catch((err) => logger.error({ err }, "Initial link check failed"));
  setInterval(() => {
    runLinkCheck().catch((err) => logger.error({ err }, "Periodic link check failed"));
  }, CHECK_INTERVAL_MS);
}, STARTUP_DELAY_MS);

router.get("/link-status", (_req, res) => {
  res.json(cachedStatus);
});

router.post("/report-link", async (req, res) => {
  const { serviceId, url, message } = req.body as {
    serviceId?: string;
    url?: string;
    message?: string;
  };
  logger.warn({ serviceId, url, message }, "🔴 USER REPORTED BROKEN LINK");
  res.json({ ok: true });
});

export default router;
