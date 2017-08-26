# Gradient Text

Easily output gradient text

### Quickstart

 - require `jquery.gradient.text.min.js`
 - add a class "gradient-text" to the element
 - set data attributes:
   * data-gradient-text-range - comma separated hex values of colors
   * data-gradient-text-position - tilt range (optional, defaults to "to top right", if you want to do a degree set with deg suffex, e.g. "300deg" )
   * data-gradient-text-percentages - comma separated percentage ranges, they may 1:1 to text-range, so should include the same number. (optional, defaults to linearly distribution) 

```$xslt
<h2>Check out this text it is <span class="gradient-text" data-gradient-text-range="#e05252,#99e052,#52e0e0,#9952e0,e05252"> even cooler</span>
```


## History

- 0.0.1 initial release
- 0.0.2 documentation added

## License

[MIT License](http://zenorocha.mit-license.org/) © Zeno Rocha
