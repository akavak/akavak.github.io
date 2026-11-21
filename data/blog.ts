// Blog posts. Add a new object to the top of the array to publish a post.
// `body` is Markdown. Images go in /public/images/blog/.

export type Post = {
  slug: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  category: string;
  excerpt: string;
  readTime: string;
  cover: "health" | "llm" | "wireless" | "backscatter";
  body: string;
};

export const posts: Post[] = [
  {
    slug: "aidcare-ai-assistant-for-diabetes",
    title: "AIDCARE: Building an AI Assistant for Everyday Diabetes Care",
    date: "2026-10-15",
    category: "Digital Health",
    readTime: "6 min read",
    cover: "health",
    excerpt:
      "Living with diabetes means making dozens of decisions a day about food, activity and insulin. AIDCARE is our attempt to bring trustworthy AI support to each of those moments.",
    body: `
People living with diabetes make a remarkable number of small, consequential decisions every day: what to eat, how much to move, when and how much insulin to take. Most of these decisions happen far away from a clinic, without a specialist at hand.

**AIDCARE** (*Artificial Intelligence Based Personalized Digital Assistant for Self-Management and Remote Monitoring of Diabetic Patients*) is a research project funded by the Health Institutes of Türkiye (TÜSEB) that our team at Kocaeli University has been running since 2024 with clinical partners. Its goal is simple to state and hard to achieve: put clinically grounded, personalised support in the patient's pocket.

## Four building blocks

Over the past two years the project has produced a family of components that work together:

1. **Image-based nutrition estimation.** Patients photograph a meal and the system estimates its nutritional content. We have explored hybrid architectures that combine convolutional networks with multimodal large language models, and confidence-aware vision–language frameworks that know when they are unsure.
2. **Exercise and lifestyle support.** Nutrition is only half of the picture. AIDCARE integrates physical-activity guidance so that recommendations reflect the whole day, not a single meal.
3. **Evidence-based insulin decision support.** A mobile decision-support mechanism applies clinical evidence-based dynamic insulin dosage adjustment rules, keeping clinicians in the loop.
4. **Trustworthy conversational AI.** A retrieval-augmented LLM answers patients' questions using curated medical sources rather than relying on the model's memory alone.

## Why integration matters

Each of these components has been studied in isolation elsewhere. What makes AIDCARE interesting as a research platform is the *integration*: a technical proof-of-concept that ties personalised nutrition, physical activity and AI-assisted care into a single lifestyle-management loop.

## Selected outputs

- *AIDCare: A Technical Proof-of-Concept for Integrating Personalized Nutrition, Physical Activity, and AI-Assisted Care in Diabetes Lifestyle Management*, **Nutrients**, 2026.
- *AI-Assisted Nutrition Estimation and Exercise Support for Integrated Lifestyle Management in Patients with Diabetes*, **Nutrients**, 2026.
- *A Hybrid CNN–MLLM Architecture for Image-Based Nutrition Estimation and Advisory Insulin Decision Support in Type 1 Diabetes*, **Nutrients**, 2026.
- *A Confidence-Aware Hybrid Vision–Language Framework for Food Recognition and Nutritional Monitoring*, **Nutrients**, 2026.

The full list is on the [publications page](/publications/). If you are a clinician or researcher interested in collaborating, please [get in touch](/contact/).
`,
  },
  {
    slug: "trustworthy-medical-llms",
    title: "Why Medical LLMs Need to Show Their Sources",
    date: "2026-08-20",
    category: "Artificial Intelligence",
    readTime: "5 min read",
    cover: "llm",
    excerpt:
      "Large language models are fluent, but fluency is not the same as reliability. In clinical settings, grounding answers in verifiable sources is not optional.",
    body: `
Large language models can explain a lab result, summarise a guideline or answer a patient's question in seconds. They can also be confidently wrong. In medicine, that combination is dangerous.

Much of our recent work in the **WINS Research Center** has focused on one question: *how do we make conversational AI trustworthy enough for health care?*

## Grounding instead of guessing

A model that answers purely from its training data cannot tell you *where* an answer came from. Our approach is to make every answer traceable:

- **Source-grounded generation.** We designed and evaluated a medical LLM that answers clinical decision-support questions from an explicit set of trusted documents, so that each statement can be checked against its source.
- **Multi-source retrieval.** For diabetes care we built a retrieval-augmented architecture that draws on several complementary knowledge sources rather than a single corpus, which improves coverage while keeping answers anchored.
- **Domain fine-tuning.** We have also studied how open-weight LLMs can be fine-tuned for connected-health management, which matters for hospitals that need to keep patient data on their own infrastructure.

## What "trustworthy" means in practice

For us, a trustworthy medical assistant should:

1. cite where its information comes from,
2. say when it does not know,
3. stay within its intended scope and defer to clinicians, and
4. run in environments that respect patient privacy.

None of these are solved problems, but each is measurable, and that is where engineering can make progress.

## Further reading

- *Design and Evaluation of a Source-Grounded Medical LLM for Clinical Decision Support and Patient Care in Trustworthy Diagnostic Systems*, **Diagnostics**, 2026.
- *A Multi-Source Retrieval-Augmented Large Language Model Architecture for Trustworthy Conversational AI in Diabetes Care*, **IEEE Access**, 2026.
- *Fine-Tuning Open-Weight LLMs for Connected Health Management: A Case Study for Diabetes Management*, **IEEE BlackSeaCom**, 2026.
`,
  },
  {
    slug: "from-smart-antennas-to-6g",
    title: "From Smart Antennas to 6G: Notes from Three Decades of Wireless Research",
    date: "2026-05-02",
    category: "Wireless Communications",
    readTime: "7 min read",
    cover: "wireless",
    excerpt:
      "The problems change names every decade (3G, LTE-A, 5G, 6G), but the core question stays the same: how do we use the radio channel more intelligently?",
    body: `
My first research measurements were GPS signal reflections off the ground in Texas in the mid-1990s. Today our group works on digital twins for 6G vehicular networks and on AI models for diabetes care. Looking back, the path between those two points is more continuous than it seems.

## Understanding the channel (1994–2001)

At The University of Texas at Austin, my doctoral work measured and modelled **vector propagation channels**: how radio signals arrive at an antenna array from different directions, and how that spatial structure changes as a user moves. That understanding is the foundation of every smart antenna and MIMO system that followed.

## Making antennas smart (2001–2012)

At Samsung Telecommunications America and then at Kocaeli University, the focus shifted to *using* that spatial structure: adaptive beamforming for cdma2000, neural-network and autoregressive prediction for downlink beamforming, OVSF code allocation with genetic algorithms, and real DSP and FPGA software-radio implementations. Several TÜBİTAK projects let us build working prototypes rather than only simulations.

## Networks of things (2006–2018)

Smart antennas turned out to be useful well beyond base stations. In wireless sensor networks we used antenna arrays at a central node for **localisation and connectivity**, which led to the sectoral sweeper scheme and its large-scale OPNET models.

## Cooperative, sliced and secure (2016–today)

With LTE-A and 5G the questions moved up the stack: cooperative relaying, fractional frequency reuse in HetNets, D2D relay selection with multi-agent reinforcement learning, network slicing with SDN/NFV, and detecting malicious relays at the physical layer with unsupervised learning.

## 6G and beyond

Today the WINS Research Center works on digital twins for 6G V2X communication, secure and low-latency edge–cloud architectures, slice-aware MEC handover, and ambient backscatter communication for battery-free devices.

## The common thread

Across all of these, the common thread is learning from the environment and adapting to it. In the 1990s that meant measuring the channel; today it increasingly means machine learning. The tools change, but the instinct stays the same.
`,
  },
  {
    slug: "backscatter-communication-battery-free-iot",
    title: "Backscatter Communication and the Battery-Free Future of IoT",
    date: "2026-02-12",
    category: "6G Research",
    readTime: "5 min read",
    cover: "backscatter",
    excerpt:
      "What if a sensor could communicate without generating its own radio signal? Ambient backscatter makes this possible, and it may be central to sustainable 6G.",
    body: `
Billions of connected devices are expected in the 6G era. Powering all of them with batteries is neither sustainable nor practical. **Ambient backscatter communication (AmBC)** offers a different path.

## Talking by reflecting

A backscatter device does not generate its own carrier signal. Instead, it *reflects* radio waves that already exist in the environment, such as TV, cellular or Wi-Fi signals, and encodes information by switching its antenna between reflecting and absorbing states. The energy cost is orders of magnitude lower than conventional transmission, which makes battery-free sensors realistic.

## The detection challenge

Because the backscattered signal is weak and rides on top of an unknown ambient signal, detecting it reliably is hard, especially in multipath (multi-tap) channels. In our BAP-funded project *Advanced Backscatter Communication Techniques for Next-Generation 6G Wireless Systems*, we compare conventional detectors with **AI-aided detectors** that learn the channel structure directly from data.

## Symbiotic sensing

Backscatter also opens the door to *symbiotic* systems, where the same radio environment is used for both communication and sensing. We explore this in a recent Springer chapter on symbiotic sensing and backscatter communication for a sustainable Internet of Things.

## Selected outputs

- *Performance Evaluation of Conventional and AI-Aided Detectors for AmBC in Multi-Tap Channels*, **BalkanCom**, 2026.
- *Symbiotic Sensing and Backscatter Communication for the Sustainable Internet of Things*, in **Signals and Communication Technology**, Springer, 2026.
`,
  },
];
