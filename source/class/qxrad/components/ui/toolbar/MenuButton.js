/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Class.define("qxrad.components.ui.toolbar.MenuButton",
{
  extend : qx.ui.toolbar.MenuButton,
  include : [ qxrad.components.MProperties,qxrad.core.MDragDrop ],




  /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
  */

  construct : function(label, icon, menu)
  {
    this.base(arguments,label, icon, menu);
	qx.event.Registration.removeAllListeners(this);
	this.setLabel("Menu Button");
    
	this.setResizable(false);
	this.setMoveable(false);

    this.setIsDroppable(true);
    this.setDropDataType([ "qxrad.components.ui.menu.Separator", "qxrad.components.ui.menu.Button","qxrad.components.ui.menu.CheckBox","qxrad.components.ui.menu.RadioButton" ]);
    this.setChildMoveable(false);
    this.setChildResizable(false);

	this.addListener("appear", function (e) {
		var menu = new qxrad.components.ui.menu.Menu();
		this.setMenu(menu); 

		var msg = new qx.event.message.Message("addComponent",
		{
			parent    : this,
			component : menu
		});
		qx.event.message.Bus.dispatch(msg);	
	});

    this.addListener("click",function (e) {
    	this.open();
    });	
	this.addListener("appear", function (e) {
		this.setUserDefinedProperties("ATOM","label","\"Menu Button\"");
	});	    
  },
  
  members : 
  {
    __dragOver : function(e)
    {
      var result = false;

      var dropDataType = this.getDropDataType();

      if (dropDataType)
      {
        for (var i=0, l=dropDataType.length; i<l; i++)
        {
          if (dropDataType[i] == e.getRelatedTarget().getQgbClassname() || dropDataType[i] == "All") result = true;
        }
      }

	  this.open();

      if (!result) {
      	e.preventDefault();
      }

    },
    __drop : function(e)
    {
      var type = e.getRelatedTarget().getQgbClassname();	
      var data = e.getData(type);	
      var classname = data;
      var componentClass = eval(classname);
      var component = new componentClass();

      this.getMenu().add(component);

      var msg = new qx.event.message.Message("addComponent",
      {
        parent    : this.getMenu(),
        component : component
      });

      qx.event.message.Bus.dispatch(msg);

    }
  }
});