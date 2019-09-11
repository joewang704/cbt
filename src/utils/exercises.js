// Static metadata on tags/other information relating to exercises
// TODO: move to js file in frontend
export const tags = {
  DEPRESSION: "depression",
  ANXIETY: "anxiety",
  SOCIAL_ANXIETY: "social_anxiety",
  PRODUCTIVITY: "productivity",
  PERFECTIONISM: "perfectionism",
}

export const exerciseMetadata = {
  ThoughtReframing: {
    tags: [tags.DEPRESSION, tags.ANXIETY],
    name: "Reframe Your Thoughts",
    link: "thought-reframing",
  },
  AntiProcrastination: {
    tags: [tags.DEPRESSION, tags.ANXIETY, tags.SOCIAL_ANXIETY, tags.PRODUCTIVITY],
    name: "Overcome Procrastination",
    description: `This exercise is meant to realign your expectations of certain activities. Depression and anxiety can alter your expectation of\
    activities, making them seem worse than they actually are. This exercise can work for events that you are anxious about, especially social events.\
    It can also help with motivation in doing tasks that seem daunting, like an essay for school.`,
    tutorial: `Take an event that you are procrastinating to do. Write down your expected satisfaction and difficulty levels from 0 to 100 percent.\
    Then, after doing the event, write down the actual satisfication and difficulty levels you felt.`,
    link: "anti-procrastination",
  },
  FacingFears: {
    tags: [tags.ANXIETY],
    name: "Face Your Fears",
    link: "facing-fears",
  },
  PleasurePredicting: {
    tags: [tags.DEPRESSION],
    name: "Enjoy Your Activities",
    link: "pleasure-predicting",
  },
  ProCons: {
    tags: [tags.DEPRESSION, tags.PRODUCTIVITY],
    name: "Pro Con List",
    link: "pro-cons",
  },
  DailySchedule: {
    tags: [tags.DEPRESSION, tags.PRODUCTIVITY],
    name: "Daily Activity Schedule",
    link: "daily-schedule",
  },
}

export default exerciseMetadata