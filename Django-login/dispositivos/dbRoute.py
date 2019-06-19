class DispositivosRoute:
    def db_for_read(self, model, **hints):
        """
            Attempts to read auth models go to auth_db.
        """
        if model._meta.app_label == 'dispositivos':
            return 'indiceSemantico'
        return None