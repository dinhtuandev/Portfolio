# Portfolio Website - Dynamic JSON Integration

This portfolio website dynamically loads all content from `user_information.json`, making it easy to update your information without editing HTML.

## Features

✅ **Dynamic Data Loading**: All content is loaded from `user_information.json`
✅ **Automatic Updates**: Change JSON file to update entire website
✅ **Complete Integration**: All sections integrated (Hero, About, Resume, Skills, Services, Projects, Contact, Footer)
✅ **Responsive Design**: Mobile-friendly Bootstrap 4 template
✅ **Easy Customization**: Just edit JSON file to personalize

## File Structure

```
ThePortfolio/
├── index.html                    # Main HTML file
├── user_information.json         # Your personal data (EDIT THIS!)
├── js/
│   ├── portfolio-loader.js       # Dynamic content loader
│   └── [other js files]
├── css/
│   └── [stylesheets]
└── images/
    └── [your images]
```

## How It Works

1. **Portfolio Loader** (`js/portfolio-loader.js`):
   - Fetches data from `user_information.json`
   - Dynamically populates all sections of the website
   - Updates on page load

2. **Data Structure** (`user_information.json`):
   - Personal information (name, email, phone, etc.)
   - Education & Experience
   - Skills (categorized)
   - Services offered
   - Projects portfolio
   - Social media links

## Sections Updated Automatically

### 1. **Hero Section**
- Name and occupation
- Location-based tagline

### 2. **About Section**
- Personal introduction
- Basic information (name, DOB, address, email, phone)
- Project count (auto-calculated from projects array)

### 3. **Resume Section**
- Career objectives (short-term & long-term)
- Education history
- Work experience

### 4. **Services Section**
- List of services from JSON
- Dynamic icon assignment

### 5. **Skills Section**
- All skills from JSON (Frontend, Language, Design, Tool, Mobile, Database)
- Auto-generated percentage bars
- Color-coded progress indicators

### 6. **Projects Section**
- Project name and description
- Technologies used
- GitHub links (if available)
- Development status

### 7. **Contact Section**
- Address, phone, email
- Social media links

### 8. **Footer**
- Social links (GitHub, Facebook, LinkedIn)
- Contact information

## How to Update Your Portfolio

### Option 1: Edit JSON File (Recommended)
Simply edit `user_information.json` with your information:

```json
{
  "full_name": "Your Name",
  "occupation": "Your Job Title",
  "email": "your.email@example.com",
  ...
}
```

### Option 2: Replace JSON File
Create a new `user_information.json` with your data following the same structure.

## JSON Structure Guide

```json
{
  "full_name": "Your full name",
  "occupation": "Your job title",
  "date_of_birth": "DD/MM/YYYY",
  "address": "Your address",
  "email": "your@email.com",
  "phone": "Your phone number",
  "website": "Your website URL or null",
  "introduction": "Brief introduction about yourself",
  
  "career_objective": {
    "short_term": "Your short-term goal",
    "long_term": "Your long-term goal"
  },
  
  "education": [
    {
      "degree": "Degree name",
      "school": "School name",
      "major": "Your major",
      "period": "2023-2027"
    }
  ],
  
  "experience": [
    {
      "title": "Job title",
      "company": "Company name",
      "period": "2023-2025"
    }
  ],
  
  "services": ["Service 1", "Service 2"],
  
  "skills": {
    "Frontend": ["HTML", "CSS", "JavaScript"],
    "Language": ["Python", "Java"],
    "Mobile": ["Kotlin", "React Native"]
  },
  
  "projects": [
    {
      "name": "Project Name",
      "description": "Project description",
      "technologies": ["Tech1", "Tech2"],
      "github": "GitHub URL or null",
      "status": "Status (optional)"
    }
  ],
  
  "social_links": {
    "github": "GitHub profile URL",
    "facebook": "Facebook profile URL",
    "linkedin": "LinkedIn profile URL"
  }
}
```

## Adding Your Photo

To add your profile photo:

1. Place your photo in the `images/` folder
2. Rename it to match the existing image names (e.g., `bg_1.png`, `bg_2.png`)
3. Or update the `style` attributes in `index.html` to point to your image:
   ```html
   style="background-image:url(images/your-photo.jpg);"
   ```

## Running the Website

### Local Development

1. **Using a Local Server** (Recommended):
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

2. **Open in browser**:
   Navigate to `http://localhost:8000`

### Important Notes

- ⚠️ **CORS**: Opening `index.html` directly in browser may cause CORS errors when loading JSON. Use a local server instead.
- 📝 **JSON Validation**: Ensure your JSON is valid (no trailing commas, proper quotes)
- 🖼️ **Images**: Update image references after adding your photos

## Customization Tips

### Adding More Skills
Edit the `skills` object in JSON:
```json
"skills": {
  "NewCategory": ["Skill1", "Skill2"]
}
```

### Adding More Projects
Add to the `projects` array:
```json
{
  "name": "New Project",
  "description": "Description",
  "technologies": ["Tech1"],
  "github": "URL"
}
```

### Changing Services
Edit the `services` array:
```json
"services": ["New Service 1", "New Service 2"]
```

## Troubleshooting

**Q: Changes not showing up?**
- Clear browser cache (Ctrl+F5)
- Check browser console for errors
- Validate JSON at jsonlint.com

**Q: JSON not loading?**
- Make sure you're using a local server
- Check file path in `portfolio-loader.js`

**Q: Sections look empty?**
- Ensure JSON structure matches the guide
- Check browser console for JavaScript errors

## Credits

- **Template**: Clark - Free Bootstrap 4 Template by [Colorlib](https://colorlib.com)
- **Dynamic Integration**: Custom JavaScript implementation

## License

Template is licensed under CC BY 3.0

---

**Need Help?** Check the browser console (F12) for error messages.
