type LearningLesson = {
  id: string
  navLabel: string
  title: string
  duration: string
  outcome: string
}

type LearningModule = {
  id: string
  navLabel: string
  title: string
  summary: string
  lessons: readonly LearningLesson[]
}

const LEARNING_MODULES = [
  {
    id: 'basics',
    navLabel: 'Basics',
    title: 'Programming Basics',
    summary:
      'Build the Java and tooling foundation every FRC programmer needs before touching robot code.',
    lessons: [
      {
        id: 'java',
        navLabel: 'Java',
        title: 'Java Syntax for Robot Code',
        duration: '25 min',
        outcome: 'Write classes, methods, conditionals, and loops with clear robot-focused examples.',
      },
      {
        id: 'git',
        navLabel: 'Git',
        title: 'Git Workflow for Teams',
        duration: '20 min',
        outcome: 'Use branches, commits, reviews, and merges without blocking the rest of the team.',
      },
      {
        id: 'setup',
        navLabel: 'Setup',
        title: 'Driver Station and VS Code Setup',
        duration: '15 min',
        outcome: 'Install WPILib, connect to a roboRIO, and deploy a starter project.',
      },
    ],
  },
  {
    id: 'robot',
    navLabel: 'Robot',
    title: 'Robot Project Structure',
    summary:
      'Move from starter templates into a command-based project that can grow during build season.',
    lessons: [
      {
        id: 'subsystems',
        navLabel: 'Subsystems',
        title: 'Subsystem Responsibilities',
        duration: '30 min',
        outcome: 'Model drivetrain, intake, and shooter code around hardware ownership boundaries.',
      },
      {
        id: 'commands',
        navLabel: 'Commands',
        title: 'Command-Based Actions',
        duration: '35 min',
        outcome: 'Compose driver controls, button bindings, and reusable robot actions.',
      },
      {
        id: 'constants',
        navLabel: 'Constants',
        title: 'Constants and Configuration',
        duration: '18 min',
        outcome: 'Keep ports, gains, limits, and feature flags organized for fast iteration.',
      },
    ],
  },
  {
    id: 'control',
    navLabel: 'Control',
    title: 'Control and Feedback',
    summary:
      'Tune robot behavior with sensors, closed-loop control, logging, and repeatable debugging habits.',
    lessons: [
      {
        id: 'sensors',
        navLabel: 'Sensors',
        title: 'Encoders, Gyros, and Limits',
        duration: '28 min',
        outcome: 'Read sensor data, handle units, and protect mechanisms with limit logic.',
      },
      {
        id: 'pid',
        navLabel: 'PID',
        title: 'PID Tuning Workflow',
        duration: '32 min',
        outcome: 'Tune proportional, integral, and derivative gains with controlled tests.',
      },
      {
        id: 'logging',
        navLabel: 'Logging',
        title: 'Telemetry and Debugging',
        duration: '24 min',
        outcome: 'Use dashboards and logs to diagnose problems during practice and events.',
      },
    ],
  },
  {
    id: 'auto',
    navLabel: 'Auto',
    title: 'Autonomous Routines',
    summary:
      'Plan, test, and refine autonomous paths that coordinate drivetrain motion and mechanisms.',
    lessons: [
      {
        id: 'pathplanner',
        navLabel: 'Paths',
        title: 'PathPlanner Fundamentals',
        duration: '30 min',
        outcome: 'Create paths, tune constraints, and connect autos to command-based code.',
      },
      {
        id: 'vision',
        navLabel: 'Vision',
        title: 'Vision-Assisted Alignment',
        duration: '34 min',
        outcome: 'Use target data to align robot pose and improve scoring consistency.',
      },
      {
        id: 'testing',
        navLabel: 'Testing',
        title: 'Auto Testing Checklist',
        duration: '18 min',
        outcome: 'Validate autos safely with simulation, logs, and field-side checks.',
      },
    ],
  },
] satisfies readonly LearningModule[]

export function LearnPage() {
  return (
    <section className="learn-page">
      <aside className="learn-sidebar" aria-label="Learning content">
        <p className="learn-sidebar-title">Learn</p>
        <ol className="learn-tree">
          {LEARNING_MODULES.map(module => (
            <li key={module.id} className="learn-tree-module">
              <a href={`#${module.id}`} className="learn-tree-link module-link">
                {module.navLabel}
              </a>
              <ol className="learn-tree-branch">
                {module.lessons.map(lesson => (
                  <li key={lesson.id} className="learn-tree-leaf">
                    <a href={`#${lesson.id}`} className="learn-tree-link">
                      {lesson.navLabel}
                    </a>
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ol>
      </aside>
      <main className="learn-content">
        <div className="learn-intro">
          <p className="section-eyebrow">Learning path</p>
          <h1 className="learn-title">FRC programming curriculum</h1>
          <p className="learn-summary">
            Follow a practical path from language basics through autonomous routines, with each
            module focused on code a team can use on a real robot.
          </p>
        </div>
        <div className="learn-modules">
          {LEARNING_MODULES.map((module, moduleIndex) => (
            <article key={module.id} id={module.id} className="learn-module">
              <div className="learn-module-header">
                <div>
                  <p className="learn-module-kicker">
                    Module {String(moduleIndex + 1).padStart(2, '0')}
                  </p>
                  <h2 className="learn-module-title">{module.title}</h2>
                </div>
                <span className="learn-module-count">{module.lessons.length} lessons</span>
              </div>
              <p className="learn-module-summary">{module.summary}</p>
              <div className="lesson-grid">
                {module.lessons.map(lesson => (
                  <section key={lesson.id} id={lesson.id} className="lesson-card">
                    <div className="lesson-card-top">
                      <h3 className="lesson-title">{lesson.title}</h3>
                      <span className="lesson-duration">{lesson.duration}</span>
                    </div>
                    <p className="lesson-outcome">{lesson.outcome}</p>
                  </section>
                ))}
              </div>
            </article>
          ))}
        </div>
      </main>
    </section>
  )
}
