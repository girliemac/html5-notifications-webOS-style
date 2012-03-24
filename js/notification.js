$(document).ready(function() {
	
	var permToggle = $('#permission'),
		emailToggle = $('#email'),
		calendarToggle = $('#calendar'),
		fbToggle = $('#fb'),
		showNotificationsButton = $('#showNotifications');
	
	var allowNotifications = false;
	
	var query = $('input').val();
	
	// Check if notifications are supported (Currently only supported by Chrome)
	if (window.webkitNotifications) {
		checkPermission();
		
	} else {
		permToggle.prop('checked', false);
		emailToggle.attr('disabled', 'disabled');
		calendarToggle.attr('disabled', 'disabled');
		fbToggle.attr('disabled', 'disabled');
		showNotificationsButton.attr('disabled', 'disabled');
		
		alert('Your browser does not support HTML5 notifications API.')
		return;
	}

	
	permToggle.change(function(e) {
		console.log('permission changeing');
		window.webkitNotifications.requestPermission(checkPermission);
	});
	
	emailToggle.change(function(e) {
		console.log('changed');
	});
	
	$('#showNotifications').click(function(e) {
		showNotifications(query);
	});
	
	
	function checkPermission() {
		console.log(window.webkitNotifications.checkPermission());
		if (window.webkitNotifications.checkPermission() == 0) { // Allowed
			permToggle.prop('checked', true);
			showNotificationsButton.removeAttr('disabled');
		} else {
			permToggle.prop('checked', false);
			showNotificationsButton.attr('disabled', 'disabled');
		}
	}

	
	function showNotifications(q) {
		var emailNotification = $('#email').prop('checked'),
			calendarNotification = $('#calendar').prop('checked'),
			fbNotification = $('#fb').prop('checked');
		var notification, 
			notification2,
			notification3;
			
		var ms = 15000; // close notification after 15 sec
		
		if(emailNotification) {
			notification = window.webkitNotifications.createHTMLNotification('email.html');
			notification.ondisplay = function(event) {
	            setTimeout(function() {event.currentTarget.cancel();}, ms);
			}
			notification.show();
		}
		if(calendarNotification) {
			notification2 = window.webkitNotifications.createHTMLNotification('calendar.html');
			notification2.ondisplay = function(event) {
	            setTimeout(function() {event.currentTarget.cancel();}, ms);
			}
			notification2.show();
		}
		if(fbNotification) {
			notification3 = window.webkitNotifications.createHTMLNotification('fb.html');
			notification3.ondisplay = function(event) {
	            setTimeout(function() {event.currentTarget.cancel();}, ms);
			}
			notification3.show();
		}
	}
});






