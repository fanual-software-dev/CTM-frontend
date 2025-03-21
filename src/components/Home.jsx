import React from 'react'

const Home = () => {
  const {user} = JSON.parse(localStorage.getItem('user'))
  const name = user.name.split(' ')
  return (
    <div className='body-container home'>
      <div className='hero'>
        <p className='heading'>Projects 'Made <br /> Easier^ <span> Stay Focused - Stay Productive.</span></p>
        {/* <p className='hero-text'>
          At EFOY TASK MANAGER, we believe that productivity should be effortless. Our mission is to provide a simple, intuitive, and powerful task management solution that helps individuals and teams stay organized, collaborate efficiently, and get things done without the hassle of complex tools.

          Whether you're managing personal tasks or handling projects with a team, EFOY TASK MANAGER ensures that every task is structured, prioritized, and completed on time.
        </p>

        <p className='hero-text'>With features like drag-and-drop organization, real-time collaboration, smart task prioritization, and seamless notifications, we make productivity a breeze.

          Join us and take control of your workflow with EFOY TASK MANAGER – because staying organized should be easy, not overwhelming.
        </p> */}

        

        <button className='call-to-action'>Subscribe to Premium Membership</button>
      </div>

      <div className='features-div'>
        <p>Features and Support</p>
        <div className='cards-div'>

          

          <div className='cards'> 
            <span>Drag & Drop Simplicity</span> 
            <p>Easily rearrange tasks within lists or move them between different categories using a smooth drag-and-drop interface. This makes organizing tasks intuitive and efficient, eliminating the need for manual sorting.</p>
          </div>

          <div className='cards'> 
            <span>Real-time Collaboration</span>
            <p>Stay in sync with your team using live updates. Any changes made to tasks—such as status updates, edits, or new assignments—are instantly reflected for everyone, ensuring seamless teamwork.</p>
          </div>

          <div className='cards'> 
            <span>Smart Task Prioritization</span>
            <p>Set deadlines, assign priorities (High, Medium, Low), and categorize tasks so you can focus on what matters most. Never miss an important deadline with clear indicators and structured workflows.</p>
          </div>

          <div className='cards'>
            <span>Intuitive UI & Dark Mode</span>
            <p>Enjoy a clean, minimal, and user-friendly interface designed for efficiency. Plus, switch between light and dark mode based on your preference to reduce eye strain.</p>
          </div>

          <div className='cards'>
            <span>Seamless Notifications</span>
            <p>Stay updated with real-time alerts on task deadlines, assignments, and changes. Whether through in-app notifications, emails, or push alerts, you’ll never miss an important update.</p>
          </div>
        </div>
      </div>

      <div className='features-div'>
        <p>WHY CHOOSE EFFOY TASK MANAGER</p>
        
        <div className='ul'>
          <ul>
            <li> <span>Fast & Lightweight</span> – No clutter, just productivity.</li>
            <li> <span>Cross-Platform</span> – Access tasks from anywhere.</li>
            <li> <span>Secure & Reliable</span> – Your data, encrypted and safe.</li>
          </ul>

          <ul>
            <li> <span>Completely Customizable</span> – Tailor your task management experience to match your workflow.</li>
            <li> <span>Lightning-Fast Performance</span> – No unnecessary clutter—just speed, efficiency, and productivity.</li>
            <li> <span>Dark Mode Support</span> – Work comfortably with light or dark mode, depending on your preference.</li>
          </ul>
        </div>
        
      </div>

      <div className='footer'>
        <div className='footer-div'>

          <div className='footer-links'>
           <a>About Us</a>
           <a>Feedback</a>
           <a>Security, Trust & Saftey</a>
          </div>

          <div className='footer-links'>
            <a>Help & Support</a>
            <a>Efoy Foundation</a>
            <a>Terms of Service</a>
          </div>

          <div className='footer-links'>
            <a>Privacy Policy</a>
            <a>Cookie Settings & Policies</a>
            <a>Enterprise Solutions</a>
          </div> 

          <div className='footer-links'>
            <a>Accessebility</a>
            <a>Desktop App</a>
            <a>Notification Settings</a>
          </div> 
        </div>
        <p className='copyright'> &copy; 2025 Efoy Team &reg; - Addis Ababa, Ethiopia</p>
      </div>
    </div>
  )
}

export default Home
