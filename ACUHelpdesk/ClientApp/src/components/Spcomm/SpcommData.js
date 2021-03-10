const mainreps = [
  {
    id: 1,
    img: "/images/stu3.svg",
    title:
      "العنوان",
    bodyText:
      "سيتم إضافة المحتوى لاحقًا...",
  },
  {
    id: 2,
    img: "/images/stu2.svg",
      title:
          "العنوان",
      bodyText:
          "سيتم إضافة المحتوى لاحقًا...",
  },
  {
    id: 3,
    img: "/images/stu1.svg",
      title:
          "العنوان",
      bodyText:
          "سيتم إضافة المحتوى لاحقًا...",
  },
];

const execreps = [
  {
    id: 1,
    img: "/images/off1.svg",
        title:
            "العنوان",
        bodyText:
            "سيتم إضافة المحتوى لاحقًا...",
  },
  {
    id: 2,
    img: "/images/off2.svg",
      title:
          "العنوان",
      bodyText:
          "سيتم إضافة المحتوى لاحقًا...",
  },
  {
    id: 3,
    img: "/images/off3.svg",
      title:
          "العنوان",
      bodyText:
          "سيتم إضافة المحتوى لاحقًا...",
  },
];

export function repData(rep) {
  switch (rep) {
    case "mainreps":
      return mainreps;
    case "execreps":
      return execreps;
    default:
      return mainreps;
  }
}
