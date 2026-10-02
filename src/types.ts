export interface TraceStep {
  id: string;
  name: string;
  status: 'completed' | 'in_progress' | 'pending' | 'flagged';
  durationMs: number;
  durationLabel: string;
  detail: string;
  payload?: Record<string, any>;
}

export interface GuardrailCheck {
  name: string;
  status: 'safe' | 'warning' | 'flagged';
  label: string;
  detail: string;
}

export interface RagasMetrics {
  faithfulness: number;
  answerRelevancy: number;
  contextPrecision: number;
  contextRecall: number;
}

export interface RetrievalSource {
  id: string;
  title: string;
  url: string;
  snippet: string;
  score: number;
  color: string;
  iconType: 'k8s' | 'cncf' | 'redhat' | 'docs' | 'book';
}

export interface ChatSession {
  id: string;
  title: string;
  group: 'Today' | 'Yesterday';
  userQuery: string;
  timestamp: string;
  totalTime: string;
  sourcesCount: number;
  ragEnabled: boolean;
  status: 'Completed' | 'In Progress' | 'Flagged';
  answerText: string[];
  keyCapabilities?: string[];
  steps: TraceStep[];
  guardrails: GuardrailCheck[];
  ragas: RagasMetrics;
  sources: RetrievalSource[];
  relatedQuestions: string[];
}

export interface ArchitectureNode {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  tool: string;
  colorClass: string;
  badgeClass: string;
  telemetryMetric: string;
  sampleTrace: string;
}
