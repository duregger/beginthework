# Quick Implementation Guide for Other Sites

## What Each Site Needs

### 1. beginthework.com
**Purpose**: Consulting business hub
**Key Elements**:
- Header: "Begin the Work" logo + navigation
- Footer: Links to samduregger.com, story.build
- About page: Sam DuRegger bio with links to personal site
- Services page: Consulting offerings
- Contact page: btw@hey.com
- Blog: Consulting insights, case studies

**Schema Required**:
- Organization schema (Begin the Work, LLC)
- Person schema (Sam DuRegger as founder/employee)
- Service schema (consulting offerings)
- WebSite schema

**Cross-Links**:
- Footer: "Founded by Sam DuRegger" → samduregger.com
- About: Full bio with link to personal site
- Blog posts: Author bio linking to samduregger.com
- Contact: "Learn more about Sam" → samduregger.com/bio

### 2. story.build
**Purpose**: Publishing platform
**Key Elements**:
- Header: StoryBuild logo + navigation
- Footer: Links to samduregger.com, beginthework.com
- Author page: Sam DuRegger profile with links
- Books page: Published works with author info
- About page: Publishing mission

**Schema Required**:
- Organization schema (StoryBuild Publishing)
- Person schema (Sam DuRegger as author)
- Book schema (all published works)
- WebSite schema

**Cross-Links**:
- Author page: Full bio linking to samduregger.com
- Book pages: Author info linking to personal site
- Footer: "Author's consulting work" → beginthework.com
- About: "Learn about the author" → samduregger.com

### 3. espressoplusmilk.com
**Purpose**: Coffee business hub
**Key Elements**:
- Header: Espresso + Milk logo + navigation
- Footer: Links to samduregger.com, tmrw.coffee, baristabot.app, cof-e.ai
- About page: Sam DuRegger as founder
- Brands page: TMRW Coffee, Barista Bot, CØF-E
- Contact page: sam@tmrw.coffee

**Schema Required**:
- Organization schema (Espresso + Milk, LLC)
- Person schema (Sam DuRegger as founder)
- Organization schema (subsidiaries)
- WebSite schema

**Cross-Links**:
- About: Founder bio linking to samduregger.com
- Brands: Links to each brand site
- Footer: "Founder's consulting work" → beginthework.com
- Contact: "Learn about Sam" → samduregger.com/bio

### 4. tmrw.coffee
**Purpose**: Coffee roasting business
**Key Elements**:
- Header: TMRW Coffee logo + navigation
- Footer: Links to samduregger.com, espressoplusmilk.com
- About page: Sam DuRegger as founder
- Products page: Coffee offerings
- Contact page: sam@tmrw.coffee

**Schema Required**:
- Organization schema (TMRW Coffee)
- Person schema (Sam DuRegger as founder)
- Product schema (coffee offerings)
- WebSite schema

**Cross-Links**:
- About: Founder bio linking to samduregger.com
- Footer: "Parent company" → espressoplusmilk.com
- Contact: "Learn about Sam" → samduregger.com/bio

### 5. baristabot.app
**Purpose**: AI ordering app
**Key Elements**:
- Header: Barista Bot logo + navigation
- Footer: Links to samduregger.com, espressoplusmilk.com
- About page: Sam DuRegger as creator
- Features page: App functionality
- Contact page: Support info

**Schema Required**:
- SoftwareApplication schema (Barista Bot)
- Person schema (Sam DuRegger as creator)
- Organization schema (Espresso + Milk as publisher)
- WebSite schema

**Cross-Links**:
- About: Creator bio linking to samduregger.com
- Footer: "Parent company" → espressoplusmilk.com
- Contact: "Learn about Sam" → samduregger.com/bio

### 6. cof-e.ai
**Purpose**: AI coffee exploration
**Key Elements**:
- Header: CØF-E logo + navigation
- Footer: Links to samduregger.com, espressoplusmilk.com
- About page: Sam DuRegger as creator
- Features page: AI functionality
- Contact page: Support info

**Schema Required**:
- SoftwareApplication schema (CØF-E)
- Person schema (Sam DuRegger as creator)
- Organization schema (Espresso + Milk as publisher)
- WebSite schema

**Cross-Links**:
- About: Creator bio linking to samduregger.com
- Footer: "Parent company" → espressoplusmilk.com
- Contact: "Learn about Sam" → samduregger.com/bio

### 7. gutenstack.com/sam
**Purpose**: Reading platform profile
**Key Elements**:
- Profile page: Sam DuRegger reading profile
- Reading lists: Book recommendations
- Reviews: Book reviews and ratings
- About: Brief bio with link to samduregger.com

**Schema Required**:
- Person schema (Sam DuRegger)
- WebPage schema (profile page)

**Cross-Links**:
- Profile: "Learn more about Sam" → samduregger.com
- About: "Sam's consulting work" → beginthework.com
- About: "Sam's writing" → story.build

## Implementation Priority

### Phase 1 (High Priority)
1. **beginthework.com** - Main business site
2. **story.build** - Publishing platform
3. **espressoplusmilk.com** - Coffee business hub

### Phase 2 (Medium Priority)
4. **tmrw.coffee** - Coffee roasting
5. **baristabot.app** - AI ordering app

### Phase 3 (Lower Priority)
6. **cof-e.ai** - AI exploration
7. **gutenstack.com/sam** - Reading profile

## Technical Requirements

### Each Site Needs:
- [ ] React/Next.js setup (for consistency)
- [ ] SEO component (react-helmet-async)
- [ ] Schema components (Person, Organization, etc.)
- [ ] Analytics setup (GA4)
- [ ] Sitemap generation
- [ ] Robots.txt
- [ ] Favicon and meta tags
- [ ] OpenGraph images
- [ ] Cross-linking implementation

### Shared Resources:
- [ ] Sam DuRegger bio content
- [ ] Professional headshots
- [ ] Company logos
- [ ] Brand guidelines
- [ ] Color schemes
- [ ] Typography choices

## Content Templates

### About Page Template
```html
<h1>About [Company Name]</h1>
<p>[Company Name] was founded by <a href="https://samduregger.com">Sam DuRegger</a>, a product strategist and writer whose work bridges technology, design, and service.</p>
<p>Sam has led digital transformation at companies like Sonic Drive-In and Oklahoma State Treasurer, and now helps teams scale smarter with AI strategy and digital execution.</p>
<p>Learn more about Sam's background and experience at <a href="https://samduregger.com/bio">samduregger.com</a>.</p>
```

### Footer Template
```html
<footer>
  <div class="footer-content">
    <div class="footer-section">
      <h3>[Company Name]</h3>
      <p>Founded by <a href="https://samduregger.com">Sam DuRegger</a></p>
    </div>
    <div class="footer-section">
      <h3>Connect</h3>
      <ul>
        <li><a href="https://samduregger.com">Sam DuRegger</a></li>
        <li><a href="https://beginthework.com">Begin the Work</a></li>
        <li><a href="https://story.build">StoryBuild Publishing</a></li>
      </ul>
    </div>
  </div>
</footer>
```

## Next Steps

1. **Choose first site** to implement (recommend beginthework.com)
2. **Set up development environment** for that site
3. **Implement core pages** with SEO and schema
4. **Add cross-linking** to samduregger.com
5. **Test and validate** schema implementation
6. **Deploy and monitor** performance
7. **Repeat for next site**

---

*This guide provides the foundation for implementing consistent SEO and cross-linking across all sites in the Sam DuRegger digital ecosystem.*
