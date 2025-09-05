/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 *   File:   tabs-automatic.js
 *
 *   Desc:   Tablist widget that implements ARIA Authoring Practices
 */

'use strict';

class TabsAutomatic {
  constructor(groupNode, allowNoActiveTab = false) {
    this.allowNoActiveTab = allowNoActiveTab;
    this.tablistNode = groupNode;

    this.tabs = [];

    this.firstTab = null;
    this.lastTab = null;

    this.tabs = Array.from(this.tablistNode.querySelectorAll('[role=tab]'));
    this.tabpanels = [];

    for (var i = 0; i < this.tabs.length; i += 1) {
      var tab = this.tabs[i];
      var tabpanel = document.getElementById(tab.getAttribute('aria-controls'));

      // If allowNoActiveTab is true, and this is the first tab, then set the tab
      // index to 0, otherwise set it to -1
      if (this.allowNoActiveTab && i === 0) {
        tab.tabIndex = 0;
      } else {
        tab.tabIndex = -1;
      }

      tab.setAttribute('aria-selected', 'false');
      this.tabpanels.push(tabpanel);

      tab.addEventListener('keydown', this.onKeydown.bind(this));
      tab.addEventListener('click', this.onClick.bind(this));

      if (!this.firstTab) {
        this.firstTab = tab;
      }
      this.lastTab = tab;
    }

    if (this.allowNoActiveTab)
      this.setSelectedTab(null, false);
    else
      this.setSelectedTab(this.firstTab, false);
  }

  setSelectedTab(currentTab, setFocus) {
    if (typeof setFocus !== 'boolean') {
      setFocus = true;
    }
    for (var i = 0; i < this.tabs.length; i += 1) {
      var tab = this.tabs[i];
      if (currentTab === tab) {

        // If you're allowing no active tab, and the current tab is already selected, de-select it
        if (this.allowNoActiveTab && tab.getAttribute('aria-selected') === 'true') {

          // Don't remove tab index so user can tab to it
          tab.setAttribute('aria-selected', 'false');
          this.tabpanels[i].setAttribute('hidden', 'hidden');
          return;
        } else {
          tab.setAttribute('aria-selected', 'true');
          tab.removeAttribute('tabindex');
          //this.tabpanels[i].classList.remove('is-hidden');
          this.tabpanels[i].removeAttribute('hidden');
          if (setFocus) {
            tab.focus();
          }
        }
      } else {
        tab.setAttribute('aria-selected', 'false');

        // if there isn't an active tab, and this is the first tab, set the tab index to 0
        if (this.allowNoActiveTab && i === 0) {
          tab.tabIndex = 0;
        } else {
          tab.tabIndex = -1;
        }

        this.tabpanels[i].setAttribute('hidden', 'hidden');
      }
    }
  }

  setSelectedToPreviousTab(currentTab) {
    var index;

    if (currentTab === this.firstTab) {
      this.setSelectedTab(this.lastTab);
    } else {
      index = this.tabs.indexOf(currentTab);
      this.setSelectedTab(this.tabs[index - 1]);
    }
  }

  setSelectedToNextTab(currentTab) {
    var index;

    if (currentTab === this.lastTab) {
      this.setSelectedTab(this.firstTab);
    } else {
      index = this.tabs.indexOf(currentTab);
      this.setSelectedTab(this.tabs[index + 1]);
    }
  }

  /* EVENT HANDLERS */

  onKeydown(event) {
    var tgt = event.currentTarget,
        flag = false;

    switch (event.key) {
      case 'ArrowLeft':
        this.setSelectedToPreviousTab(tgt);
        flag = true;
        break;

      case 'ArrowRight':
        this.setSelectedToNextTab(tgt);
        flag = true;
        break;

      case 'Home':
        this.setSelectedTab(this.firstTab);
        flag = true;
        break;

      case 'End':
        this.setSelectedTab(this.lastTab);
        flag = true;
        break;

      default:
        break;
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  onClick(event) {
    this.setSelectedTab(event.currentTarget);
  }
}