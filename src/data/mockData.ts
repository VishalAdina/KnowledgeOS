import { ChatSession, ArchitectureNode } from '../types';

export const CHAT_SESSIONS: ChatSession[] = [
  {
    id: 'k8s-query',
    title: 'What is Kubernetes?',
    group: 'Today',
    userQuery: 'What is Kubernetes and how does it help in production deployments?',
    timestamp: '12:01 PM',
    totalTime: '12.4s',
    sourcesCount: 6,
    ragEnabled: true,
    status: 'Completed',
    answerText: [
      'Kubernetes is an open-source container orchestration platform that helps you automate the deployment, scaling, management, and operation of containerized applications.',
      'It provides a robust ecosystem for running applications in production by handling automated deployment rollouts, horizontal and vertical autoscaling, container self-healing, service discovery, CPU/memory resource boundaries, and uniform multi-environment runtime across on-premise, public cloud, and hybrid clusters.',
      'In production, Kubernetes guarantees high availability, zero-downtime rolling updates, and self-healing node isolation, making it the de-facto standard for running modern cloud-native workloads.'
    ],
    keyCapabilities: [
      'Automated deployment and rollouts – Deploy and update applications with zero downtime.',
      'Scaling – Automatically scale based on demand (horizontal and vertical).',
      'Self-healing – Automatically restarts failed containers and replaces unhealthy nodes.',
      'Service discovery and load balancing – Exposes applications reliably.',
      'Resource management – Efficiently allocates CPU and memory across the cluster.',
      'Multi-environment support – Works across on-premise, cloud, and hybrid environments.'
    ],
    steps: [
      {
        id: 'step-1',
        name: 'Intent Classification',
        status: 'completed',
        durationMs: 120,
        durationLabel: '120 ms',
        detail: 'Detected: Technical Query',
        payload: { confidence: 0.994, category: 'devops/cloud-native', intent: 'conceptual_explanation' }
      },
      {
        id: 'step-2',
        name: 'Guardrails Check (NeMo)',
        status: 'completed',
        durationMs: 89,
        durationLabel: '89 ms',
        detail: 'Passed',
        payload: { pii_detected: false, toxicity_score: 0.002, policy_violations: [] }
      },
      {
        id: 'step-3',
        name: 'Planner (LangGraph)',
        status: 'completed',
        durationMs: 342,
        durationLabel: '342 ms',
        detail: 'Created execution plan',
        payload: { nodes: ['rag_retriever', 'flash_reranker', 'llm_synthesizer'], state: 'READY' }
      },
      {
        id: 'step-4',
        name: 'Retrieval (Vector DB + Reranker)',
        status: 'completed',
        durationMs: 1800,
        durationLabel: '1.8 s',
        detail: 'Retrieved 12 docs → Re-ranked to 6',
        payload: { index: 'k8s-docs-v1.30', top_k: 12, rerank_model: 'cohere-rerank-v3', final_k: 6 }
      },
      {
        id: 'step-5',
        name: 'LLM (via Portkey)',
        status: 'completed',
        durationMs: 9700,
        durationLabel: '9.7 s',
        detail: 'Generated response',
        payload: { model: 'gpt-4o', prompt_tokens: 1420, completion_tokens: 382, cost_usd: 0.0084 }
      }
    ],
    guardrails: [
      { name: 'Input safety check', status: 'safe', label: 'Safe', detail: 'Zero prompt injections or bypass attempts detected.' },
      { name: 'Sensitive data detection', status: 'safe', label: 'No issues', detail: 'No credit cards, API keys, or personal identifiable data.' },
      { name: 'Topic relevance', status: 'safe', label: 'Within domain', detail: 'Context aligned with technical cloud engineering corpus.' },
      { name: 'Output safety check', status: 'safe', label: 'Safe', detail: 'Hallucination check passed; grounded in retrieved evidence.' }
    ],
    ragas: {
      faithfulness: 0.92,
      answerRelevancy: 0.89,
      contextPrecision: 0.87,
      contextRecall: 0.85
    },
    sources: [
      {
        id: 'src-1',
        title: 'Kubernetes Official Documentation',
        url: 'kubernetes.io/docs',
        snippet: 'Kubernetes is a portable, extensible, open source platform for managing containerized workloads and services that facilitates both declarative configuration and automation.',
        score: 0.92,
        color: 'text-blue-600 bg-blue-50',
        iconType: 'k8s'
      },
      {
        id: 'src-2',
        title: 'CNCF - What is Kubernetes?',
        url: 'cncf.io/reports/k8s-overview',
        snippet: 'A graduated CNCF project originally designed by Google, providing an ecosystem of components including kube-apiserver, etcd, kube-scheduler, and kubelet.',
        score: 0.88,
        color: 'text-indigo-600 bg-indigo-50',
        iconType: 'cncf'
      },
      {
        id: 'src-3',
        title: 'Red Hat - Kubernetes Architecture',
        url: 'redhat.com/topics/containers/kubernetes-architecture',
        snippet: 'A working Kubernetes cluster contains control plane nodes and worker nodes. Containers run within Pods, managed by Deployments and StatefulSets.',
        score: 0.84,
        color: 'text-red-600 bg-red-50',
        iconType: 'redhat'
      },
      {
        id: 'src-4',
        title: 'K8s Concepts Guide',
        url: 'kubernetes.io/docs/concepts',
        snippet: 'Describes core objects: Services, Ingress, PersistentVolumes, ConfigMaps, and Secrets ensuring self-healing operations.',
        score: 0.81,
        color: 'text-slate-700 bg-slate-100',
        iconType: 'docs'
      }
    ],
    relatedQuestions: [
      'How to deploy a simple app on Kubernetes?',
      'What are Kubernetes core components?',
      'Kubernetes vs Docker – what is the difference?'
    ]
  },
  {
    id: 'langgraph-query',
    title: 'Explain LangGraph',
    group: 'Today',
    userQuery: 'How does LangGraph enable cyclical agentic state machines compared to linear DAGs?',
    timestamp: '11:42 AM',
    totalTime: '8.2s',
    sourcesCount: 4,
    ragEnabled: true,
    status: 'Completed',
    answerText: [
      'LangGraph is an orchestration framework specifically designed for building stateful, multi-actor applications with LLMs through cyclical graph structures.',
      'Unlike linear DAG systems (like standard LangChain Runnables or Airflow), LangGraph introduces first-class cycles, allowing agents to iteratively loop through thinking, tool execution, reflection, and human-in-the-loop validation steps until an exit condition is met.'
    ],
    keyCapabilities: [
      'State persistence & checkpointing across conversational turns.',
      'Cyclical edge transitions based on conditional agent routing.',
      'Time-travel debugging and state fork inspection.',
      'Native Human-in-the-loop review nodes.'
    ],
    steps: [
      { id: 'step-1', name: 'Intent Classification', status: 'completed', durationMs: 95, durationLabel: '95 ms', detail: 'Architecture query' },
      { id: 'step-2', name: 'Guardrails Check (NeMo)', status: 'completed', durationMs: 76, durationLabel: '76 ms', detail: 'Passed' },
      { id: 'step-3', name: 'Planner (LangGraph)', status: 'completed', durationMs: 290, durationLabel: '290 ms', detail: 'Graph router compiled' },
      { id: 'step-4', name: 'Retrieval (Vector DB)', status: 'completed', durationMs: 1200, durationLabel: '1.2 s', detail: 'Retrieved 8 LangGraph docs' },
      { id: 'step-5', name: 'LLM Generation', status: 'completed', durationMs: 6500, durationLabel: '6.5 s', detail: 'Response streamed' }
    ],
    guardrails: [
      { name: 'Input safety check', status: 'safe', label: 'Safe', detail: 'Safe technical prompt.' },
      { name: 'Sensitive data detection', status: 'safe', label: 'No issues', detail: 'Clean telemetry.' },
      { name: 'Topic relevance', status: 'safe', label: 'Within domain', detail: 'LangGraph ecosystem.' },
      { name: 'Output safety check', status: 'safe', label: 'Safe', detail: 'Fully grounded.' }
    ],
    ragas: { faithfulness: 0.94, answerRelevancy: 0.91, contextPrecision: 0.89, contextRecall: 0.88 },
    sources: [
      { id: 'src-lg-1', title: 'LangGraph Documentation', url: 'langchain.com/langgraph', snippet: 'LangGraph allows cyclical execution graphs with shared state typed via TypedDict or Pydantic.', score: 0.95, color: 'text-emerald-600 bg-emerald-50', iconType: 'docs' },
      { id: 'src-lg-2', title: 'Agent Architectures Review', url: 'blog.langchain.dev/stateful-agents', snippet: 'Cyclic flows are fundamental for code repair, multi-step search, and validation loops.', score: 0.89, color: 'text-blue-600 bg-blue-50', iconType: 'cncf' }
    ],
    relatedQuestions: [
      'How to add human-in-the-loop breakpoints in LangGraph?',
      'Comparing LangGraph vs AutoGen vs CrewAI',
      'What is Checkpointer in LangGraph?'
    ]
  },
  {
    id: 'rag-query',
    title: 'How does RAG work?',
    group: 'Today',
    userQuery: 'Can you walk through the end-to-end Retrieval Augmented Generation pipeline?',
    timestamp: '10:15 AM',
    totalTime: '6.8s',
    sourcesCount: 5,
    ragEnabled: true,
    status: 'Completed',
    answerText: [
      'Retrieval-Augmented Generation (RAG) optimizes LLM responses by fetching authoritative knowledge from an external source before generating the answer.',
      'The pipeline consists of Ingestion (Chunking, Embedding, Indexing), Retrieval (Vector cosine similarity + BM25 keyword hybrid search), Reranking (Cross-encoder scoring), and Generation (Grounded synthesis with citation references).'
    ],
    steps: [
      { id: 'step-1', name: 'Intent Classification', status: 'completed', durationMs: 110, durationLabel: '110 ms', detail: 'Exploratory question' },
      { id: 'step-2', name: 'Guardrails Check', status: 'completed', durationMs: 65, durationLabel: '65 ms', detail: 'Passed' },
      { id: 'step-3', name: 'Vector Search', status: 'completed', durationMs: 920, durationLabel: '920 ms', detail: '5 relevant chunks' },
      { id: 'step-4', name: 'LLM Generation', status: 'completed', durationMs: 5700, durationLabel: '5.7 s', detail: 'Generated with citations' }
    ],
    guardrails: [
      { name: 'Input safety check', status: 'safe', label: 'Safe', detail: 'No risks detected' },
      { name: 'Sensitive data detection', status: 'safe', label: 'No issues', detail: 'Clean query' },
      { name: 'Topic relevance', status: 'safe', label: 'Within domain', detail: 'RAG Architecture' },
      { name: 'Output safety check', status: 'safe', label: 'Safe', detail: '100% faithful' }
    ],
    ragas: { faithfulness: 0.96, answerRelevancy: 0.94, contextPrecision: 0.91, contextRecall: 0.89 },
    sources: [
      { id: 'src-rag-1', title: 'Dense Retrieval & Reranking Guide', url: 'arxiv.org/abs/2005.11401', snippet: 'Lewis et al. introduce RAG combining parametric memory with non-parametric retrieval.', score: 0.96, color: 'text-purple-600 bg-purple-50', iconType: 'book' }
    ],
    relatedQuestions: [
      'What chunking strategy works best for PDFs?',
      'Why use a Flash Reranker over raw vector search?',
      'How to evaluate RAG faithfulness with RAGAS?'
    ]
  },
  {
    id: 'portkey-query',
    title: 'Setup Portkey gateway',
    group: 'Today',
    userQuery: 'How to configure the Portkey AI Gateway for fallback routing, latency budgeting, and virtual keys?',
    timestamp: '09:05 AM',
    totalTime: '5.4s',
    sourcesCount: 3,
    ragEnabled: true,
    status: 'Completed',
    answerText: [
      'Portkey AI Gateway acts as a high-speed reverse proxy between your agent logic and 200+ LLM endpoints, enabling unified observability, load-balancing, and automated failover.',
      'You configure fallback rules inside your Portkey config JSON: if OpenAI returns 429 rate limit or 503 outage, traffic instantaneously shifts to Anthropic or Gemini within 40ms without dropping user connections.'
    ],
    steps: [
      { id: 'step-1', name: 'Intent Classification', status: 'completed', durationMs: 80, durationLabel: '80 ms', detail: 'Gateway setup' },
      { id: 'step-2', name: 'NeMo Guardrails', status: 'completed', durationMs: 70, durationLabel: '70 ms', detail: 'Passed' },
      { id: 'step-3', name: 'Retrieval', status: 'completed', durationMs: 750, durationLabel: '750 ms', detail: 'Config schemas loaded' },
      { id: 'step-4', name: 'LLM Stream', status: 'completed', durationMs: 4500, durationLabel: '4.5 s', detail: 'Code sample generated' }
    ],
    guardrails: [
      { name: 'Input safety check', status: 'safe', label: 'Safe', detail: 'Safe configuration question' },
      { name: 'Sensitive data detection', status: 'safe', label: 'No issues', detail: 'No secrets exposed' },
      { name: 'Topic relevance', status: 'safe', label: 'Within domain', detail: 'LLM Gateways' },
      { name: 'Output safety check', status: 'safe', label: 'Safe', detail: 'Verified schemas' }
    ],
    ragas: { faithfulness: 0.95, answerRelevancy: 0.92, contextPrecision: 0.90, contextRecall: 0.88 },
    sources: [
      { id: 'src-pk-1', title: 'Portkey Docs - Config Gateway', url: 'portkey.ai/docs/gateway', snippet: 'Define retries, exponential backoff, and caching in declarative configs.', score: 0.94, color: 'text-amber-600 bg-amber-50', iconType: 'docs' }
    ],
    relatedQuestions: [
      'How to setup budget limits per user in Portkey?',
      'Can Portkey cache semantic embeddings?'
    ]
  },
  {
    id: 'nemo-query',
    title: 'NeMo guardrails config',
    group: 'Today',
    userQuery: 'How to write Colang 2.0 flows for jailbreak prevention and topic steering?',
    timestamp: '08:20 AM',
    totalTime: '7.1s',
    sourcesCount: 4,
    ragEnabled: true,
    status: 'Completed',
    answerText: [
      'NVIDIA NeMo Guardrails uses Colang to define programmable guardrails around LLMs. You define input rails, dialog rails, retrieval rails, and output rails.',
      'In Colang 2.0, you define explicit user intents, bot responses, and flow triggers that block prompt injections before the request reaches the generative model.'
    ],
    steps: [
      { id: 'step-1', name: 'Intent Classification', status: 'completed', durationMs: 90, durationLabel: '90 ms', detail: 'Policy check' },
      { id: 'step-2', name: 'NeMo Guardrails Check', status: 'completed', durationMs: 82, durationLabel: '82 ms', detail: 'Passed' },
      { id: 'step-3', name: 'Retrieval', status: 'completed', durationMs: 1100, durationLabel: '1.1 s', detail: 'Colang syntax retrieved' },
      { id: 'step-4', name: 'LLM Generation', status: 'completed', durationMs: 5800, durationLabel: '5.8 s', detail: 'Synthesized' }
    ],
    guardrails: [
      { name: 'Input safety check', status: 'safe', label: 'Safe', detail: 'Safe inquiry' },
      { name: 'Sensitive data detection', status: 'safe', label: 'No issues', detail: 'Zero PII' },
      { name: 'Topic relevance', status: 'safe', label: 'Within domain', detail: 'AI Safety' },
      { name: 'Output safety check', status: 'safe', label: 'Safe', detail: 'Compliant' }
    ],
    ragas: { faithfulness: 0.93, answerRelevancy: 0.90, contextPrecision: 0.88, contextRecall: 0.86 },
    sources: [
      { id: 'src-nemo-1', title: 'NVIDIA NeMo Guardrails GitHub', url: 'github.com/NVIDIA/NeMo-Guardrails', snippet: 'Programmable guardrails to keep conversations on-track, secure, and factually grounded.', score: 0.95, color: 'text-emerald-600 bg-emerald-50', iconType: 'docs' }
    ],
    relatedQuestions: [
      'How to integrate NeMo with LangChain and LangGraph?',
      'How much latency does NeMo add on average?'
    ]
  },
  {
    id: 'vector-query',
    title: 'Compare vector DBs',
    group: 'Yesterday',
    userQuery: 'Compare PostgreSQL pgvector with Pinecone and Qdrant for enterprise high-QPS search.',
    timestamp: 'Yesterday 4:30 PM',
    totalTime: '5.8s',
    sourcesCount: 5,
    ragEnabled: true,
    status: 'Completed',
    answerText: [
      'Choosing between pgvector, Pinecone, and Qdrant hinges on operational complexity, index types (HNSW vs IVFFlat), and relational metadata filtering requirements.',
      'PostgreSQL + pgvector is unbeatable when you need ACID transactions and relational joins with enterprise data in the same DB. Qdrant delivers ultra-fast native Rust performance for complex payload filtering. Pinecone provides effortless zero-ops serverless scale.'
    ],
    steps: [
      { id: 'step-1', name: 'Classification', status: 'completed', durationMs: 110, durationLabel: '110 ms', detail: 'Database benchmark' },
      { id: 'step-2', name: 'Guardrails', status: 'completed', durationMs: 75, durationLabel: '75 ms', detail: 'Passed' },
      { id: 'step-3', name: 'Retrieval', status: 'completed', durationMs: 980, durationLabel: '980 ms', detail: 'Benchmarking papers' },
      { id: 'step-4', name: 'LLM Stream', status: 'completed', durationMs: 4600, durationLabel: '4.6 s', detail: 'Rendered comparison' }
    ],
    guardrails: [
      { name: 'Input safety check', status: 'safe', label: 'Safe', detail: 'Safe' },
      { name: 'Sensitive data detection', status: 'safe', label: 'No issues', detail: 'Clean' },
      { name: 'Topic relevance', status: 'safe', label: 'Within domain', detail: 'Database engineering' },
      { name: 'Output safety check', status: 'safe', label: 'Safe', detail: 'Clean' }
    ],
    ragas: { faithfulness: 0.91, answerRelevancy: 0.88, contextPrecision: 0.86, contextRecall: 0.84 },
    sources: [
      { id: 'src-v1', title: 'Vector Database Benchmarks 2026', url: 'benchmark.ann.io', snippet: 'Recall vs latency curves under 10k QPS across pgvector, Qdrant, and Pinecone.', score: 0.91, color: 'text-sky-700 bg-sky-50', iconType: 'docs' }
    ],
    relatedQuestions: [
      'When should I migrate from pgvector to a dedicated vector engine?',
      'How to optimize HNSW m and ef_construction parameters?'
    ]
  },
  {
    id: 'eval-query',
    title: 'Evaluate RAG pipeline',
    group: 'Yesterday',
    userQuery: 'How to setup automated CI/CD synthetic evaluation using RAGAS and DeepEval?',
    timestamp: 'Yesterday 2:10 PM',
    totalTime: '6.2s',
    sourcesCount: 4,
    ragEnabled: true,
    status: 'Completed',
    answerText: [
      'Automated RAG evaluation in CI/CD requires golden test datasets and LLM-as-a-judge scoring on every pull request or prompt change.',
      'By running RAGAS in your GitHub Actions or GitLab pipeline, you fail builds if Faithfulness falls below 0.85 or Context Precision drops below 0.80, catching hallucinations before staging.'
    ],
    steps: [
      { id: 'step-1', name: 'Classification', status: 'completed', durationMs: 95, durationLabel: '95 ms', detail: 'CI/CD pipeline test' },
      { id: 'step-2', name: 'Guardrails', status: 'completed', durationMs: 70, durationLabel: '70 ms', detail: 'Passed' },
      { id: 'step-3', name: 'Retrieval', status: 'completed', durationMs: 850, durationLabel: '850 ms', detail: 'Test harness specs' },
      { id: 'step-4', name: 'LLM Stream', status: 'completed', durationMs: 5100, durationLabel: '5.1 s', detail: 'Output generated' }
    ],
    guardrails: [
      { name: 'Input safety check', status: 'safe', label: 'Safe', detail: 'Safe' },
      { name: 'Sensitive data detection', status: 'safe', label: 'No issues', detail: 'Safe' },
      { name: 'Topic relevance', status: 'safe', label: 'Within domain', detail: 'Evaluation' },
      { name: 'Output safety check', status: 'safe', label: 'Safe', detail: 'Safe' }
    ],
    ragas: { faithfulness: 0.97, answerRelevancy: 0.95, contextPrecision: 0.93, contextRecall: 0.91 },
    sources: [
      { id: 'src-e1', title: 'RAGAS CI/CD Integration', url: 'docs.ragas.io/ci-cd', snippet: 'Automated evaluation hooks for regression testing RAG models.', score: 0.97, color: 'text-blue-600 bg-blue-50', iconType: 'docs' }
    ],
    relatedQuestions: [
      'How to generate synthetic test datasets using Gemini?',
      'What is the cost of running RAGAS in CI/CD?'
    ]
  },
  {
    id: 'aws-query',
    title: 'Deploy on AWS',
    group: 'Yesterday',
    userQuery: 'How to deploy an enterprise KnowledgeOS stack on AWS EKS with GPU node groups?',
    timestamp: 'Yesterday 11:00 AM',
    totalTime: '6.4s',
    sourcesCount: 5,
    ragEnabled: true,
    status: 'Completed',
    answerText: [
      'Deploying KnowledgeOS on AWS leverages Amazon EKS with Karpenter autoscaling and NVIDIA g5.2xlarge GPU spot instances for embedding and reranking models.',
      'We recommend deploying LangGraph state checkpointers on Amazon RDS PostgreSQL with pgvector, and caching frequent queries with ElastiCache Redis.'
    ],
    steps: [
      { id: 'step-1', name: 'Classification', status: 'completed', durationMs: 100, durationLabel: '100 ms', detail: 'AWS Infrastructure' },
      { id: 'step-2', name: 'Guardrails', status: 'completed', durationMs: 65, durationLabel: '65 ms', detail: 'Passed' },
      { id: 'step-3', name: 'Retrieval', status: 'completed', durationMs: 1200, durationLabel: '1.2 s', detail: 'AWS reference architecture' },
      { id: 'step-4', name: 'LLM Stream', status: 'completed', durationMs: 5000, durationLabel: '5.0 s', detail: 'Generated' }
    ],
    guardrails: [
      { name: 'Input safety check', status: 'safe', label: 'Safe', detail: 'Safe' },
      { name: 'Sensitive data detection', status: 'safe', label: 'No issues', detail: 'Safe' },
      { name: 'Topic relevance', status: 'safe', label: 'Within domain', detail: 'DevOps' },
      { name: 'Output safety check', status: 'safe', label: 'Safe', detail: 'Safe' }
    ],
    ragas: { faithfulness: 0.88, answerRelevancy: 0.89, contextPrecision: 0.86, contextRecall: 0.84 },
    sources: [
      { id: 'src-aws-1', title: 'AWS Well-Architected GenAI Guide', url: 'aws.amazon.com/architecture/genai', snippet: 'Best practices for securing agent gateways and VPC endpoints.', score: 0.88, color: 'text-amber-600 bg-amber-50', iconType: 'redhat' }
    ],
    relatedQuestions: [
      'Terraform module for KnowledgeOS on AWS',
      'How to setup VPC Peering for vector databases?'
    ]
  },
  {
    id: 'pydantic-query',
    title: 'Pydantic models',
    group: 'Yesterday',
    userQuery: 'How to enforce structured JSON outputs from LLMs using Pydantic v2 schemas?',
    timestamp: 'Yesterday 09:30 AM',
    totalTime: '4.8s',
    sourcesCount: 3,
    ragEnabled: true,
    status: 'Completed',
    answerText: [
      'Pydantic v2 provides high-performance schema definition and validation for LLM tool calling and structured output extraction.',
      'By passing `response_format=PydanticModel` to your LLM gateway, the model is strictly constrained to output JSON conforming to field validations, regex patterns, and type constraints.'
    ],
    steps: [
      { id: 'step-1', name: 'Classification', status: 'completed', durationMs: 80, durationLabel: '80 ms', detail: 'Pydantic Code' },
      { id: 'step-2', name: 'Guardrails', status: 'completed', durationMs: 60, durationLabel: '60 ms', detail: 'Passed' },
      { id: 'step-3', name: 'Retrieval', status: 'completed', durationMs: 700, durationLabel: '700 ms', detail: 'Pydantic v2 API' },
      { id: 'step-4', name: 'LLM Stream', status: 'completed', durationMs: 3900, durationLabel: '3.9 s', detail: 'Complete' }
    ],
    guardrails: [
      { name: 'Input safety check', status: 'safe', label: 'Safe', detail: 'Safe' },
      { name: 'Sensitive data detection', status: 'safe', label: 'No issues', detail: 'Safe' },
      { name: 'Topic relevance', status: 'safe', label: 'Within domain', detail: 'Data Modeling' },
      { name: 'Output safety check', status: 'safe', label: 'Safe', detail: 'Safe' }
    ],
    ragas: { faithfulness: 0.98, answerRelevancy: 0.96, contextPrecision: 0.94, contextRecall: 0.92 },
    sources: [
      { id: 'src-pyd-1', title: 'Pydantic v2 Structured Outputs', url: 'docs.pydantic.dev/latest', snippet: 'Compile-time JSON schema generation and rust-powered validation.', score: 0.98, color: 'text-pink-600 bg-pink-50', iconType: 'docs' }
    ],
    relatedQuestions: [
      'Handling validation errors with automated LLM retries',
      'Nested Pydantic models with optional recursive fields'
    ]
  }
];

export const ARCHITECTURE_NODES: ArchitectureNode[] = [
  {
    id: 'node-user',
    name: 'User Query',
    subtitle: 'Natural language question',
    description: 'Incoming user prompt or conversational turn sent via API, webhook, or interactive UI chat widget.',
    tool: 'Client SDK / REST / WebSocket',
    colorClass: 'text-blue-600 bg-blue-50 border-blue-200',
    badgeClass: 'bg-blue-100 text-blue-800',
    telemetryMetric: 'Inbound QPS: 420 req/s',
    sampleTrace: '{"user_id": "usr_9918", "channel": "web_chat", "query": "What is Kubernetes?", "session_id": "sess_810a"}'
  },
  {
    id: 'node-nemo',
    name: 'NeMo Guardrails',
    subtitle: 'Safety & policy compliance',
    description: 'NVIDIA NeMo Guardrails inspects input for jailbreaks, prompt injection, toxicity, and domain policy before routing.',
    tool: 'NVIDIA NeMo Guardrails + Colang 2.0',
    colorClass: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    badgeClass: 'bg-emerald-100 text-emerald-800',
    telemetryMetric: 'Avg Latency: 89 ms | Pass Rate: 99.92%',
    sampleTrace: '{"action": "check_input", "jailbreak_score": 0.001, "pii_filtered": [], "policy": "safe_technical_domain"}'
  },
  {
    id: 'node-langgraph',
    name: 'LangGraph Orchestrator',
    subtitle: 'Stateful multi-actor agent graph',
    description: 'Manages state machines, memory checkpoints, dynamic tool routing, and cyclical reasoning loops across tools.',
    tool: 'LangGraph + LangChain Core',
    colorClass: 'text-purple-600 bg-purple-50 border-purple-200',
    badgeClass: 'bg-purple-100 text-purple-800',
    telemetryMetric: 'Nodes: 4 | Cycles: 1 | Step Time: 342 ms',
    sampleTrace: '{"graph_id": "agentic_rag_v3", "state": {"step": "planner", "plan": ["retrieve", "rerank", "synthesize"]}}'
  },
  {
    id: 'node-retrieval',
    name: 'Retrieval & Reranker',
    subtitle: 'Vector DB + Flash Reranker',
    description: 'Hybrid search across PostgreSQL pgvector / vector DB with cross-encoder Flash Reranker to filter top-k chunks.',
    tool: 'pgvector + Flash Reranker v3',
    colorClass: 'text-blue-600 bg-blue-50 border-blue-200',
    badgeClass: 'bg-blue-100 text-blue-800',
    telemetryMetric: 'Retrieved: 12 docs → Kept: 6 docs (1.8s)',
    sampleTrace: '{"index": "cloud_native_kb", "embeddings": "text-embedding-3-small", "rerank_score_cutoff": 0.80}'
  },
  {
    id: 'node-portkey',
    name: 'Portkey LLM Gateway',
    subtitle: 'Cost, fallback & model gateway',
    description: 'Enterprise proxy handling rate limits, automated multi-provider failover, virtual keys, and real-time token tracking.',
    tool: 'Portkey AI Gateway',
    colorClass: 'text-amber-600 bg-amber-50 border-amber-200',
    badgeClass: 'bg-amber-100 text-amber-800',
    telemetryMetric: 'Tokens: 1,802 | Cost: $0.0084 | Cache: Miss',
    sampleTrace: '{"upstream": "openai/gpt-4o", "virtual_key": "prod-knowledgeos", "latency_ms": 9700, "status": 200}'
  },
  {
    id: 'node-ragas',
    name: 'RAGAS Continuous Eval',
    subtitle: 'Automated LLM-as-a-judge',
    description: 'Real-time telemetry evaluation measuring Faithfulness, Answer Relevancy, Context Precision, and Context Recall.',
    tool: 'RAGAS + DeepEval Suite',
    colorClass: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    badgeClass: 'bg-emerald-100 text-emerald-800',
    telemetryMetric: 'Faithfulness: 0.92 | Relevancy: 0.89',
    sampleTrace: '{"faithfulness": 0.92, "answer_relevancy": 0.89, "context_precision": 0.87, "context_recall": 0.85}'
  },
  {
    id: 'node-llm',
    name: 'LLM Generation',
    subtitle: 'Grounded response synthesis',
    description: 'Synthesizes context chunks into concise, structured responses with inline markdown citations and bullet summaries.',
    tool: 'GPT-4o / Claude 3.5 / Gemini 1.5 Pro',
    colorClass: 'text-blue-600 bg-blue-50 border-blue-200',
    badgeClass: 'bg-blue-100 text-blue-800',
    telemetryMetric: 'Streaming: 721 ms TTFT | 42 tokens/sec',
    sampleTrace: '{"completion_tokens": 382, "finish_reason": "stop", "grounding_citations": [1, 2, 3, 4]}'
  },
  {
    id: 'node-response',
    name: 'Final Response',
    subtitle: 'Delivered to user & logged to traces',
    description: 'Streamed to the client with rich metadata chips (execution latency, sources count, evaluation scores, feedback buttons).',
    tool: 'KnowledgeOS Client Engine',
    colorClass: 'text-slate-800 bg-white border-slate-200',
    badgeClass: 'bg-slate-100 text-slate-800',
    telemetryMetric: 'Total Pipeline Duration: 12.4s',
    sampleTrace: '{"trace_id": "tr_893201", "status": "completed", "client_ack": true}'
  }
];

export const HOURLY_HISTOGRAM_DATA = [
  { hour: '00:00', requests: 12400, heightPct: 30 },
  { hour: '02:00', requests: 17800, heightPct: 42 },
  { hour: '04:00', requests: 10500, heightPct: 25 },
  { hour: '06:00', requests: 28200, heightPct: 65 },
  { hour: '07:00', requests: 24100, heightPct: 55 },
  { hour: '08:00', requests: 21000, heightPct: 48 },
  { hour: '09:00', requests: 31200, heightPct: 70 },
  { hour: '10:00', requests: 35600, heightPct: 80 },
  { hour: '11:00', requests: 27900, heightPct: 62 },
  { hour: '11:30', requests: 33400, heightPct: 75 },
  { hour: '12:00', requests: 39100, heightPct: 88 },
  { hour: '12:30', requests: 42207, heightPct: 98, isPeak: true },
  { hour: '13:00', requests: 32000, heightPct: 72 },
  { hour: '14:00', requests: 26000, heightPct: 58 },
  { hour: '15:00', requests: 28400, heightPct: 64 },
  { hour: '16:00', requests: 34800, heightPct: 78 },
  { hour: '17:00', requests: 36700, heightPct: 82 },
  { hour: '18:00', requests: 31000, heightPct: 70 },
  { hour: '19:00', requests: 24500, heightPct: 55 },
  { hour: '20:00', requests: 26800, heightPct: 60 },
  { hour: '21:00', requests: 19800, heightPct: 45 },
  { hour: '22:00', requests: 16900, heightPct: 38 }
];

export const RECENT_TRACES_TABLE = [
  {
    id: 'tr-01',
    query: 'Explain Kubernetes...',
    fullQuery: 'Explain Kubernetes container orchestration and pod lifecycle',
    steps: 6,
    latency: '342 ms',
    guardrails: 'Passed',
    guardrailType: 'pass',
    evalScore: '0.92',
    time: '2m ago',
    model: 'gpt-4o',
    tokens: 420
  },
  {
    id: 'tr-02',
    query: 'How to deploy on AWS?',
    fullQuery: 'How to deploy on AWS EKS with Terraform and Karpenter autoscaler?',
    steps: 6,
    latency: '1.2 s',
    guardrails: 'Passed',
    guardrailType: 'pass',
    evalScore: '0.88',
    time: '4m ago',
    model: 'claude-3-5-sonnet',
    tokens: 890
  },
  {
    id: 'tr-03',
    query: 'Compare scaling options',
    fullQuery: 'Compare scaling options: HPA vs KEDA vs cluster autoscaling',
    steps: 7,
    latency: '5.8 s',
    guardrails: 'Flagged',
    guardrailType: 'flagged',
    evalScore: '0.76',
    time: '6m ago',
    model: 'gpt-4o',
    tokens: 1410
  },
  {
    id: 'tr-04',
    query: 'NeMo Colang 2.0 flows',
    fullQuery: 'Configure NeMo Colang 2.0 flows for financial compliance',
    steps: 5,
    latency: '412 ms',
    guardrails: 'Passed',
    guardrailType: 'pass',
    evalScore: '0.95',
    time: '12m ago',
    model: 'gemini-1-5-pro',
    tokens: 530
  },
  {
    id: 'tr-05',
    query: 'Pgvector HNSW indexing',
    fullQuery: 'Optimize PostgreSQL pgvector HNSW index m=16 ef_construction=64',
    steps: 6,
    latency: '820 ms',
    guardrails: 'Passed',
    guardrailType: 'pass',
    evalScore: '0.94',
    time: '18m ago',
    model: 'gpt-4o',
    tokens: 720
  }
];

export const TESTIMONIALS = [
  {
    quote: '“KnowledgeOS gives us complete visibility into our RAG pipeline and helps us ship reliable AI products with confidence.”',
    author: 'Sarah Chen',
    title: 'CTO, AI Platform',
    tag: 'Early Team User',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80'
  },
  {
    quote: '“We cut hallucination rates by 74% within 2 weeks of deploying NeMo Guardrails and RAGAS through KnowledgeOS.”',
    author: 'Marcus Vance',
    title: 'VP of Engineering, FinScale AI',
    tag: 'Enterprise Customer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80'
  },
  {
    quote: '“The real-time trace timeline and LangGraph visualization saved our team countless hours debugging agent state loops.”',
    author: 'Elena Rostova',
    title: 'Lead AI Architect, CloudData',
    tag: 'Scale Tier',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&auto=format&fit=crop&q=80'
  }
];
