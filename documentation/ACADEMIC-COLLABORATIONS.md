# Academic Collaborations

TI Mindmap HUB is committed to advancing research in the intersection of Generative AI and Cyber Threat Intelligence. This document details our academic collaborations, supervised research, and partnership opportunities.

---

## Supervised Research

### STIX 2.1 Generator — Giulio Triggiani (2024-2025)

**Master's Thesis: Automatic Generation of STIX 2.1 Bundles using Large Language Models**

| | |
|---|---|
| **Author** | Giulio Triggiani |
| **Type** | Master's Thesis |
| **University** | University of Salerno (UNISA) |
| **Supervisors** | Assoc. Prof. Arcangelo Castiglione, Ing. Antonio Formato |
| **Status** | ✅ Completed and Integrated |
| **Repository** | [GiulioTriggiani/STIX-2.1-Generator](https://github.com/GiulioTriggiani/STIX-2.1-Generator) |

#### Abstract

This thesis explores the automatic generation of STIX 2.1 bundles from unstructured threat intelligence reports using Large Language Models. The research addresses the challenge of transforming narrative threat reports into structured, machine-readable formats that can be ingested by security tools.

#### Key Contributions

1. **LLM-Based Extraction Pipeline**
   - Extraction of STIX Domain Objects (SDOs): Threat Actors, Malware, Campaigns, Attack Patterns
   - Extraction of STIX Cyber Observables (SCOs): IPs, Domains, URLs, File Hashes
   - Automated relationship mapping using semantic analysis

2. **Evaluation Framework**
   - Standard evaluation: object-by-object precision/recall
   - Graph-based evaluation: structural similarity metrics
   - Comparison across multiple LLM configurations

3. **Production Integration**
   - Methodology integrated into TI Mindmap HUB
   - Processing ~40 threat reports weekly
   - Real-time STIX validation and export

#### Results

| Metric | Result |
|--------|--------|
| SDO Precision | ~85% |
| SDO Recall | ~78% |
| Relationship Accuracy | ~72% |
| Schema Compliance | 100% |

#### Resources

- 📄 [Full Thesis (PDF)](https://github.com/GiulioTriggiani/STIX-2.1-Generator/blob/main/thesis/Tesi_Triggiani_Giulio.pdf)
- 💻 [Source Code & Notebooks](https://github.com/GiulioTriggiani/STIX-2.1-Generator)
- 📊 [Evaluation Datasets](https://github.com/GiulioTriggiani/STIX-2.1-Generator/tree/main/dataset)

#### Citation

```bibtex
@mastersthesis{triggiani2025stix,
  title = {Automatic Generation of STIX 2.1 Bundles using Large Language Models},
  author = {Triggiani, Giulio},
  year = {2025},
  school = {University of Salerno},
  type = {Master's Thesis},
  supervisor = {Castiglione, Arcangelo and Formato, Antonio},
  url = {https://github.com/GiulioTriggiani/STIX-2.1-Generator}
}
```

---

## Research Areas

We are actively seeking collaborations in the following areas:

### 1. STIX 2.1 Generation and Validation

- Improving extraction accuracy for complex threat reports
- Multi-language support for non-English reports
- Automated validation and correction of generated bundles
- Comparison of different LLM architectures

### 2. Knowledge Graph Construction

- Building threat intelligence knowledge graphs
- Entity resolution across multiple reports
- Temporal analysis of threat evolution
- Graph-based threat hunting queries

### 3. LLM Evaluation in Security Contexts

- Benchmarking LLMs for CTI tasks
- Hallucination detection in security outputs
- Adversarial testing of extraction pipelines
- Human-AI collaboration studies

### 4. MCP Protocol Applications

- Novel MCP tool development for security
- Multi-agent systems for threat analysis
- Real-time intelligence sharing protocols

---

## Collaboration Opportunities

### Thesis Supervision

We offer thesis supervision for Master's and PhD students working on:

- Generative AI applications in cybersecurity
- Automated threat intelligence processing
- STIX/TAXII implementations
- Security data visualization

**What we provide:**
- Access to TI Mindmap HUB platform and APIs
- Real-world datasets (anonymized)
- Technical mentorship
- Potential for production integration

### Joint Research Projects

Open to collaboration on:

- Grant proposals (EU Horizon, national funding)
- Joint publications
- Dataset creation and sharing
- Tool development

### Dataset Access

Researchers can request access to:

- Processed threat report corpus
- STIX bundle samples
- Evaluation datasets
- API access for research purposes

---

## How to Apply

### For Thesis Students

1. Review our [research areas](#research-areas)
2. Prepare a 1-page research proposal
3. Contact us at [info@ti-mindmap-hub.com](mailto:info@ti-mindmap-hub.com) with:
   - Your proposal
   - CV/Resume
   - Academic supervisor contact
   - Expected timeline

### For Researchers

1. Contact us at [info@ti-mindmap-hub.com](mailto:info@ti-mindmap-hub.com)
2. Describe your research interest
3. Propose a collaboration format

---

## Publications

*This section will be updated as research outputs are published.*

### Planned Publications

- Evaluation of LLM accuracy in STIX generation (in preparation)
- TI Mindmap HUB: Platform architecture and lessons learned (planned)

---

*Last updated: January 2025*
