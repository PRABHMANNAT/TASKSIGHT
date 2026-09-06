export type Experiment = {
  id: string;
  date: string;
  setup: string;
  hypothesis: string;
  sampleSize: number;
  result: string;
  limitations: string;
  artifacts: string[];
};
// Add only completed, documented experiments. No measured results exist yet.
export const experiments: Experiment[] = [];
export const evaluationDimensions = [
  'Asset identification',
  'Port / component identification',
  'Action verification',
  'Sequence violation detection',
  'Verification latency',
  'False-warning rate',
  'Report completeness',
];
export const evidenceUrl =
  'https://uptimeinstitute.com/about-ui/press-releases/uptime-announces-annual-outage-analysis-report-2026';
