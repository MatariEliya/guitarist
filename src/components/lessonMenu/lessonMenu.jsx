import './lessonMenu.css'
const lessons = [
  { id: 1, title: "Lesson 1" },
  { id: 2, title: "Lesson 2" },
  { id: 3, title: "Lesson 3" },
];
function LessonMenu() {
  return (
    
    <>
      <div className="box">
        <h1 className="title">lessons</h1>
        {lessons.map((lesson) => (
          <button key={lesson.id} className="lesson">
            {lesson.title}
          </button>
          
        ))}
      </div>

    </>
    
  );
}

export default LessonMenu;
