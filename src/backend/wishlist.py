import frappe
import json
from collections import defaultdict
from .camel_case import dict_keys_to_camel
from frappe.utils import get_url


def camel_response(data):
    if isinstance(data, dict):
        return dict_keys_to_camel(data)
    elif isinstance(data, list):
        return [dict_keys_to_camel(item) if isinstance(item, dict) else item for item in data]
    return data


def get_full_image_url(path):
    if not path:
        return get_url("/files/placeholder.svg")
    return get_url(path)


@frappe.whitelist(allow_guest=True)
def add_to_wishlist():
    try:
        data = json.loads(frappe.request.data)
        product_id = data.get('productId')
        user = data.get('user')
        guest_uid = data.get('guestUid')

        if not product_id:
            return camel_response([])

        wishlist = get_or_create_wishlist(user=user, visitor_id=guest_uid)
        if not wishlist:
            return camel_response([])

        existing = [item.product for item in wishlist.items]
        if product_id in existing:
            items_list = [
                {
                    "product": item.product,
                    "product_name": item.product_name,
                    "product_image": get_full_image_url(item.product_image),
                    "second_image": get_full_image_url(item.second_image),
                    "price": item.price,
                    "added_on": item.added_on,
                    "slug": item.slug
                }
                for item in wishlist.items
            ]
            return camel_response(items_list)

        product = frappe.get_doc("Product", product_id)
        product_image, second_image = "", ""

        for img in getattr(product, "product_img", []):
            if getattr(img, "primary_image", 0):
                product_image = img.image_url if img.cdn_image else img.attach_image
                break

        for img in getattr(product, "product_img", []):
            if getattr(img, "secondary_image", 0):
                second_image = img.image_url if img.cdn_image else img.attach_image
                break

        wishlist.append("items", {
            "product": product.name,
            "product_name": product.product_name,
            "product_image": product_image or None,
            "second_image": second_image or None,
            "price": product.price,
            "slug": product.product_slug
        })
        wishlist.save()
        frappe.db.commit()

        items_list = [
            {
                "product": item.product,
                "product_name": item.product_name,
                "product_image": get_full_image_url(item.product_image),
                "second_image": get_full_image_url(item.second_image),
                "price": item.price,
                "added_on": item.added_on,
                "slug": item.slug
            }
            for item in wishlist.items
        ]
        return camel_response(items_list)

    except Exception:
        frappe.log_error(title="add_to_wishlist_error", message=frappe.get_traceback())
        return camel_response([])


@frappe.whitelist(allow_guest=True)
def remove_from_wishlist():
    try:
        data = json.loads(frappe.request.data)
        product_id = data.get('productId')
        user = data.get('user')
        guest_uid = data.get('guestUid')

        if not product_id:
            return camel_response([])

        wishlist = get_wishlist(user=user, visitor_id=guest_uid)
        if not wishlist:
            return camel_response([])

        for item in wishlist.items:
            if item.product == product_id:
                wishlist.remove(item)
                wishlist.save()
                frappe.db.commit()
                break

        items_list = [
            {
                "product": item.product,
                "product_name": item.product_name,
                "product_image": get_full_image_url(item.product_image),
                "second_image": get_full_image_url(item.second_image),
                "price": item.price,
                "added_on": item.added_on,
                "slug": item.slug
            }
            for item in wishlist.items
        ]
        return camel_response(items_list)

    except Exception:
        frappe.log_error(title="remove_from_wishlist_error", message=frappe.get_traceback())
        return camel_response([])


@frappe.whitelist(allow_guest=True)
def get_wishlist_items():
    try:
        data = json.loads(frappe.request.data)
        user = data.get('user')
        guest_uid = data.get('guestUid')

        wishlist = get_wishlist(user=user, visitor_id=guest_uid)
        if not wishlist:
            return camel_response([])

        items = [
            {
                "product": item.product,
                "product_name": item.product_name,
                "product_image": get_full_image_url(item.product_image),
                "second_image": get_full_image_url(item.second_image),
                "price": item.price,
                "added_on": item.added_on,
                "slug": item.slug
            }
            for item in wishlist.items
        ]
        return camel_response(items)

    except Exception:
        frappe.log_error(title="get_wishlist_items_error", message=frappe.get_traceback())
        return camel_response([])


@frappe.whitelist(allow_guest=True)
def is_in_wishlist():
    try:
        data = json.loads(frappe.request.data)
        product_id = data.get('productId')
        user = data.get('user')
        guest_uid = data.get('guestUid')

        if not product_id:
            return False

        wishlist = get_wishlist(user=user, visitor_id=guest_uid)
        if not wishlist:
            return False

        product_ids = [item.product for item in wishlist.items]
        return product_id in product_ids

    except Exception:
        frappe.log_error(title="is_in_wishlist_error", message=frappe.get_traceback())
        return False


@frappe.whitelist(allow_guest=True)
def clear_wishlist():
    try:
        data = json.loads(frappe.request.data)
        user = data.get('user')
        guest_uid = data.get('guestUid')

        wishlist = get_wishlist(user=user, visitor_id=guest_uid)
        if not wishlist:
            return camel_response([])

        wishlist.items = []
        wishlist.save()
        frappe.db.commit()

        return camel_response([])

    except Exception:
        frappe.log_error(title="clear_wishlist_error", message=frappe.get_traceback())
        return camel_response([])


@frappe.whitelist(allow_guest=True)
def merge_wishlist():
    try:
        data = json.loads(frappe.request.data)
        guest_uid = data.get('guestUid')
        user = data.get('user')

        if not guest_uid or not user:
            frappe.throw("Guest UID and User are required for merging wishlists.")

        # Get the guest's wishlist
        guest_wishlist = get_wishlist(visitor_id=guest_uid)
        if not guest_wishlist:
            return camel_response([]) # No guest wishlist to merge

        # Get or create the user's wishlist
        user_wishlist = get_or_create_wishlist(user=user)

        # Merge items
        for guest_item in guest_wishlist.items:
            # Check if item already exists in user's wishlist to avoid duplicates
            if not any(item.product == guest_item.product for item in user_wishlist.items):
                user_wishlist.append("items", {
                    "product": guest_item.product,
                    "product_name": guest_item.product_name,
                    "product_image": guest_item.product_image,
                    "second_image": guest_item.second_image,
                    "price": guest_item.price,
                    "slug": guest_item.slug
                })
        user_wishlist.save()
        frappe.db.commit()

        # Optionally, clear the guest's wishlist after merging
        guest_wishlist.items = []
        guest_wishlist.save()
        frappe.db.commit()

        # Return the merged wishlist
        items_list = [
            {
                "product": item.product,
                "product_name": item.product_name,
                "product_image": get_full_image_url(item.product_image),
                "second_image": get_full_image_url(item.second_image),
                "price": item.price,
                "added_on": item.added_on,
                "slug": item.slug
            }
            for item in user_wishlist.items
        ]
        return camel_response(items_list)

    except Exception:
        frappe.log_error(title="merge_wishlist_error", message=frappe.get_traceback())
        return camel_response([])


def get_or_create_wishlist(user=None, visitor_id=None):
    if not user and not visitor_id:
        return None

    filters = {}
    if user:
        filters["user"] = user
    elif visitor_id:
        filters["visitor_id"] = visitor_id
    else:
        return None

    existing = frappe.db.exists("Wishlist", filters)
    if existing:
        return frappe.get_doc("Wishlist", existing)

    wishlist = frappe.new_doc("Wishlist")
    if user:
        wishlist.user = user
    if visitor_id:
        wishlist.visitor_id = visitor_id
    wishlist.insert()
    return wishlist


def get_wishlist(user=None, visitor_id=None):
    if not user and not visitor_id:
        return None

    filters = {}
    if user:
        filters["user"] = user
    elif visitor_id:
        filters["visitor_id"] = visitor_id
    else:
        return None

    existing = frappe.db.exists("Wishlist", filters)
    return frappe.get_doc("Wishlist", existing) if existing else None
