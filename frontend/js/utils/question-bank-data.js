// 刷题系统数据骨架
// 当前示例为项目原创内容，用于验证题库结构，不使用受版权保护的真题原文。

export const QUESTION_BANK_VERSION = "2026-07-02-a";

export const READING_SETS = [
  {
    id: "reading-urban-gardens-001",
    skill: "reading",
    title: "Urban Gardens and Community Health",
    level: "band-5.5-6.5",
    estimatedMinutes: 18,
    sourceType: "original",
    copyright: "Original content for IELTS Master.",
    passage: [
      "In many large cities, unused land is being converted into small community gardens. These spaces are often managed by local residents, who grow vegetables, herbs and flowers together. Supporters argue that urban gardens provide more than fresh food. They also create opportunities for neighbours to communicate, share skills and develop a stronger sense of belonging.",
      "Researchers have observed several practical benefits. First, community gardens can improve access to healthy food in areas where supermarkets are limited. Second, they offer light physical activity for older people and office workers. Third, they may reduce local temperatures by replacing concrete surfaces with plants. However, the impact of these gardens depends on careful planning. If the land is temporary or the soil is contaminated, the project may not be sustainable.",
      "City governments increasingly see community gardens as part of wider urban policy. Some provide small grants, water access or training sessions. Others include gardens in housing developments. Nevertheless, there are disagreements about land use. In expensive cities, developers may prefer to build commercial property on the same land. The long-term success of urban gardens therefore depends on public support, secure land agreements and clear management responsibilities.",
    ],
    questions: [
      {
        id: "r-urban-001-q1",
        type: "true-false-not-given",
        prompt: "Community gardens can help neighbours communicate more often.",
        answer: "True",
        explanation: "Paragraph 1 says these gardens create opportunities for neighbours to communicate.",
      },
      {
        id: "r-urban-001-q2",
        type: "true-false-not-given",
        prompt: "All community gardens are built on permanently protected land.",
        answer: "False",
        explanation: "Paragraph 2 says some land may be temporary, which means not all gardens are permanent.",
      },
      {
        id: "r-urban-001-q3",
        type: "short-answer",
        prompt: "According to the passage, what can be contaminated and make a garden less sustainable?",
        answer: "soil",
        explanation: "Paragraph 2 mentions contaminated soil as a risk.",
      },
      {
        id: "r-urban-001-q4",
        type: "multiple-choice",
        prompt: "Which factor is mentioned as necessary for long-term success?",
        options: ["Private advertising", "Secure land agreements", "Higher supermarket prices", "Larger car parks"],
        answer: "Secure land agreements",
        explanation: "The final sentence lists secure land agreements as one condition for success.",
      },
    ],
  },
];

export const LISTENING_SETS = [
  {
    id: "listening-library-tour-001",
    skill: "listening",
    title: "Library Orientation",
    level: "band-5.0-6.0",
    estimatedMinutes: 8,
    sourceType: "original",
    audioUrl: "",
    transcript: [
      "Good morning everyone, and welcome to the city library. My name is Anna, and I will briefly explain the services available to new members.",
      "On the ground floor, you will find the main information desk and the self-service machines. If you need to borrow books, please use your membership card and enter your four-digit PIN. The children's section is also on this floor, next to the cafe.",
      "The study rooms are on the second floor. They are free, but you must book them online at least one day in advance. Each booking lasts two hours. If you need a longer session, you can make a second booking if the room is still available.",
      "Finally, please remember that printing is not free. Black-and-white pages cost ten cents each, and colour pages cost thirty cents. If you have any problems, ask a member of staff at the information desk.",
    ],
    questions: [
      {
        id: "l-library-001-q1",
        type: "form-completion",
        prompt: "The speaker's name is ____.",
        answer: "Anna",
        explanation: "The speaker says, 'My name is Anna.'",
      },
      {
        id: "l-library-001-q2",
        type: "form-completion",
        prompt: "Study rooms must be booked at least ____ in advance.",
        answer: "one day",
        explanation: "The speaker says study rooms must be booked online at least one day in advance.",
      },
      {
        id: "l-library-001-q3",
        type: "multiple-choice",
        prompt: "How long does each study room booking last?",
        options: ["One hour", "Two hours", "Three hours", "A full day"],
        answer: "Two hours",
        explanation: "The transcript states that each booking lasts two hours.",
      },
      {
        id: "l-library-001-q4",
        type: "form-completion",
        prompt: "Colour printing costs ____ cents per page.",
        answer: "thirty",
        explanation: "The speaker says colour pages cost thirty cents.",
      },
    ],
  },
];

export function getReadingSet(id) {
  return READING_SETS.find(set => set.id === id);
}

export function getListeningSet(id) {
  return LISTENING_SETS.find(set => set.id === id);
}
