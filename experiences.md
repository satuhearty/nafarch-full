---
layout: page
title: Experiences
permalink: /experiences
---

<section id="cd-timeline" class="cd-container">
  {% assign i = 1 %}
  {% assign previousYear = 0 %}
  {% assign toggleRight = true %}
  {% assign experiences = site.posts | sort: 'date' | reverse %}
  {% for post in experiences %}
    {% assign level = site.data.level | where:"id", post.level | first %}
    {% assign currentYear = post.timeline-year %}
    {% if previousYear != currentYear %}
      <div class="cd-timeline-year {% if i == 1 %}small-margin{% endif %}">
        <h1>{{ currentYear }}</h1>
      </div>
      {% assign previousYear = currentYear %}
      {% if toggleRight == true %}
        {% assign toggleRight = false %}
      {% else %}
        {% assign toggleRight = true %}
      {% endif %}     
    {% endif %}
    <div class="cd-timeline-block {% if toggleRight == true %}right{% endif %}">
      <div class="cd-timeline-img cd-index {% if i != 1 %}is-hidden{% endif %} {% if post.categories contains 'key-project' %}key-project{% endif %}">
        {% if post.categories contains 'key-project' %}
          <p><i class="icon fa-star"></i></p>
        {% else %}
          <p>{{ i }}</p>
        {% endif %}
      </div>
      <div class="cd-timeline-content {% if i != 1 %}is-hidden{% endif %} {% if post.categories contains 'key-project' %}key-project{% endif %}">
        {% if post.categories contains 'key-project' %}
          <h3>* Key Project</h3>
        {% endif %}
        <h3>
          <a href="works/{{ post.title | replace: " ", "-" | replace: "&", "and" | downcase }}">
            {{ post.title }}
          </a>
        </h3>      
        <p>
          {{ post.timeline-title }} {{ post.timeline-subtitle }}
        </p>
        <span class="image fit">
          <img src="{{ post.timeline-image }}" alt="{{ post.timeline-title }}" />
        </span>
        <span class="cd-date">       
          <h3>
            {{ level.company }}<br />
            {{ level.title }}<br />
            {{ level.date }}
          </h3>
        </span>
      </div>
    </div>
    {% assign i = i | plus:1 %}
  {% endfor %}
</section>
