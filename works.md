---
layout: page
title: Works
permalink: /works
---

<section class="tiles">
	{% for post in site.posts %}
	  {% if post.categories contains 'works' %}
      <article class="style1">
        <span class="image">
          {% if post.image == null %}
            <img src="{{ site.url }}{{ site.baseurl }}/images/pic01.jpg" alt="" />
          {% else %}
            <img src="{{ site.baseurl }}{{ post.image }}" alt="" />
          {% endif %}
        </span>
        <a href="{{ site.baseurl }}{{ post.url }}">
          <h2>{{ post.title }}</h2>
          <div class="content">
            <p>{{ post.subtitle }}</p>
          </div>
        </a>
      </article>
    {% endif %}
	{% endfor %}
</section>