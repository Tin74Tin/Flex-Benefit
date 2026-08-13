-- ============================================================================
-- Make approval/rejection notifications show the claim's actual currency,
-- plus the SGD equivalent when it's not already SGD.
-- Safe to run any time - just replaces the two existing trigger functions,
-- doesn't touch data or re-create the triggers themselves.
-- ============================================================================

create or replace function public.handle_claim_rejected()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  amount_display text;
begin
  if new.status = 'rejected' and (old.status is distinct from 'rejected') then
    amount_display := coalesce(new.currency, 'SGD') || ' ' || to_char(new.amount, 'FM999999990.00');
    if coalesce(new.currency, 'SGD') <> 'SGD' then
      amount_display := amount_display || ', approx SGD ' || to_char(new.amount_sgd, 'FM999999990.00');
    end if;
    insert into public.notifications (employee_id, message)
    values (
      new.employee_id,
      'Your claim for ' || new.category || ' (' || amount_display || ') was rejected: '
        || coalesce(new.reject_reason, '')
        || case when new.admin_note is not null and new.admin_note <> '' then ' - ' || new.admin_note else '' end
    );
  end if;
  return new;
end;
$$;

create or replace function public.handle_claim_approved()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  reimbursement_date text;
  amount_display text;
begin
  if new.status = 'approved' and (old.status is distinct from 'approved') then
    reimbursement_date := to_char(
      (date_trunc('month', now()) + interval '1 month' - interval '1 day')::date,
      'DD Mon YYYY'
    );
    amount_display := coalesce(new.currency, 'SGD') || ' ' || to_char(new.amount, 'FM999999990.00');
    if coalesce(new.currency, 'SGD') <> 'SGD' then
      amount_display := amount_display || ', approx SGD ' || to_char(new.amount_sgd, 'FM999999990.00');
    end if;
    insert into public.notifications (employee_id, message)
    values (
      new.employee_id,
      'Your claim for ' || new.category || ' (' || amount_display ||
      ') has been approved and will be reimbursed by ' || reimbursement_date || '.'
    );
  end if;
  return new;
end;
$$;
